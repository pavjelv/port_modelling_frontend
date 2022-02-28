import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SystemParameters, SystemType} from "../../../../model/theory/system-type";
import {LoadingOverlayService} from "../../../../services/loading-overlay.service";
import {TheoryResultsService} from "../../../../services/theory-results.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {isPlatformBrowser} from "@angular/common";
import {TheorySummaryModel} from "../../../../model/theory/theory-summary.model";
import {ActivatedRoute} from "@angular/router";
import {CalculatedSystemTypeDictionary, SystemTypeDictionary} from "../../../../dictionaries/system-type.dictionary";
import {MatDialog} from "@angular/material/dialog";
import {MultChannelRejectPopoverComponent} from "../mult-channel-reject-popover/mult-channel-reject-popover.component";

@Component({
  selector: "app-calculate-values-form",
  templateUrl: "./calculate-values-form.component.html",
  styleUrls: ["./calculate-values-form.component.less"]
})
export class CalculateValuesFormComponent implements OnInit {
  public systemParametersForm: FormGroup;
  public isBrowser = false;

  public parameters = SystemParameters;
  public rangeParameterControl: FormControl;
  public systemTypeParameterControl: FormControl;
  public controlToParameterMap: Map<SystemParameters, FormControl> = new Map<SystemParameters, FormControl>();
  public disabledParameter: SystemParameters = SystemParameters.LAMBDA;

  // charts
  public servingProbabilityData: any[] = [{
    label: "Вероятность обслуживания.",
  }];
  public queueLengthData: any[] = [{
    label: "Средняя длина очереди",
  }];
  public systemTimeData: any[] = [{
    label: "Среднее время пребывания в системе",
  }];
  public lineChartLabels: any[] = [];
  public systemName = "";

  public calculatedSystemTypes = Array.from(CalculatedSystemTypeDictionary).map(([key, value]) => {
    return {
      id: key,
      value,
    };
  });

  constructor(private fb: FormBuilder,
              @Inject(PLATFORM_ID) private platformId: unknown,
              private loadingService: LoadingOverlayService,
              private optimalSizeService: TheoryResultsService,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private dialog: MatDialog,
  )
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.systemName = SystemTypeDictionary.get(this.route.snapshot.queryParamMap.get("systemType"));
    this.systemParametersForm = new FormGroup({});
    this.rangeParameterControl = new FormControl(SystemParameters.LAMBDA);
    this.rangeParameterControl.valueChanges.subscribe((v) => {
      this.systemParametersForm.enable({ emitEvent: false });
      this.systemParametersForm.get(v).disable({ emitEvent: false });
      this.disabledParameter = v;
    });
    this.systemTypeParameterControl = new FormControl(SystemType.WITH_QUEUE);
    this.systemTypeParameterControl.valueChanges.subscribe((v) => {
      if (this.rangeParameterControl.value === SystemParameters.QUEUE_LENGTH) {
        this.rangeParameterControl.setValue(SystemParameters.LAMBDA);
      }
    });
    this.systemParametersForm.registerControl("systemType", this.systemTypeParameterControl);
    this.systemParametersForm.registerControl("rangeParameter", this.rangeParameterControl);
    Object.values(this.parameters).forEach((parameter) => {
      const disabled = parameter === SystemParameters.LAMBDA;
      const control = new FormControl({value: (disabled ? 0.4 : 2), disabled}, Validators.min(0));
      this.controlToParameterMap.set(parameter, control);
      this.systemParametersForm.registerControl(parameter, control);
    });
    this.systemParametersForm.valueChanges.subscribe((v) => {
      this._onSubmit();
    });
    this.systemParametersForm.updateValueAndValidity();
  }

  private processTheorySummary(summary: TheorySummaryModel): void {
    this.lineChartLabels = summary.parameter_range.map((v => String(v)));
    // @ts-ignore
    this.chartOptions.series[0].data = summary.result.map(((value, i) => {
      return {
        x: String(summary.parameter_range[i]),
        y: value.p_serv,
      };
    }));
    this.servingProbabilityData = [{
      data: summary.result.map((value => value.p_serv)),
      label: "Вероятность обслуживания.",
    },
    ];
    this.queueLengthData = [{
      data: summary.result.map((value => value.l_queue)),
      label: "Средняя длина очереди",
    }];
    this.systemTimeData = [{
      data: summary.result.map((value => value.t_sys)),
      label: "Среднее время пребывания в системе",
    }];
    this.cdr.markForCheck();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(MultChannelRejectPopoverComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  _onSubmit(): void {
    this.loadingService.showLoading();
    this.optimalSizeService.calculateWithQueue(this.systemParametersForm.getRawValue())
      .subscribe((summary) => {
        this.loadingService.hideLoading();
        this.processTheorySummary(summary);
      }, (error: Error) => {
        this.loadingService.hideLoading();
        console.error(error);
        this.snackBar.open(error.message, null, {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      });
  }
}
