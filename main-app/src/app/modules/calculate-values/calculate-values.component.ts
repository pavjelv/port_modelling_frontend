import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingOverlayService} from "../../services/loading-overlay.service";
import {TheoryResultsService} from "../../services/theory-results.service";
import {ChartDataSets} from "chart.js";
import {Color, Label} from "ng2-charts";
import {isPlatformBrowser} from "@angular/common";
import {SystemParameters, SystemType} from "../../model/theory/system-type";
import {queueLengthColors, servingProbabilityColors, systemWaitingTimeColors} from "./chart-colors.const";
import {TheorySummaryModel} from "../../model/theory/theory-summary.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-calculate-values",
  templateUrl: "./calculate-values.component.html",
  styleUrls: ["./calculate-values.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalculateValuesComponent implements OnInit {
  public systemParametersForm: FormGroup;
  public isBrowser = false;

  public parameters = SystemParameters;
  public rangeParameterControl: FormControl;
  public controlToParameterMap: Map<SystemParameters, FormControl> = new Map<SystemParameters, FormControl>();
  public disabledParameter: SystemParameters = SystemParameters.LAMBDA;

  // charts
  public servingProbabilityData: ChartDataSets[] = [{
    label: "Вероятность обслуживания.",
  }];
  public queueLengthData: ChartDataSets[] = [{
    label: "Средняя длина очереди",
  }];
  public systemTimeData: ChartDataSets[] = [{
    label: "Среднее время пребывания в системе",
  }];
  public lineChartLabels: Label[] = [];

  public servingProbabilityColors: Color[] = servingProbabilityColors;
  public queueLengthColors: Color[] = queueLengthColors;
  public systemWaitingTimeColors: Color[] = systemWaitingTimeColors;

  systems = [
    { value: "Многоканальная СМО с бесконечной очередью", id:  SystemType.INFINITE_QUEUE },
    { value: "Многоканальная СМО с отказами", id: SystemType.WITH_REJECT },
    { value: "Многоканальная СМО с ограниченной очередью", id: SystemType.WITH_QUEUE }
  ];
  constructor(private fb: FormBuilder,
              @Inject(PLATFORM_ID) private platformId: unknown,
              private loadingService: LoadingOverlayService,
              private optimalSizeService: TheoryResultsService,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar
              )
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.systemParametersForm = new FormGroup({});
    this.rangeParameterControl = new FormControl(SystemParameters.LAMBDA);
    this.rangeParameterControl.valueChanges.subscribe((v) => {
      this.systemParametersForm.enable({ emitEvent: false });
      this.systemParametersForm.get(v).disable({ emitEvent: false });
      this.disabledParameter = v;
    });
    this.systemParametersForm.registerControl("systemType", new FormControl(SystemType.WITH_QUEUE));
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
  }

  private processTheorySummary(summary: TheorySummaryModel): void {
    this.lineChartLabels = summary.parameter_range.map((v => String(v)));
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
