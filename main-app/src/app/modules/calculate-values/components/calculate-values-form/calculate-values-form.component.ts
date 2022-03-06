import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SystemParameters, SystemType} from "../../../../model/theory/system-type";
import {LoadingOverlayService} from "../../../../services/loading-overlay.service";
import {TheoryResultsService} from "../../../../services/theory-results.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {isPlatformBrowser} from "@angular/common";
import {TheorySummaryModel} from "../../../../model/theory/theory-summary.model";
import {ActivatedRoute} from "@angular/router";
import {SystemTypeDictionary} from "../../../../dictionaries/system-type.dictionary";
import {MatDialog} from "@angular/material/dialog";
import {MultChannelRejectPopoverComponent} from "../mult-channel-reject-popover/mult-channel-reject-popover.component";
import {
  AvailableSystemCharacteristicsDictionary,
  SystemParametersDictionary
} from "../../../../dictionaries/available-system-characteristics.dictionary";
import {DomSanitizer} from "@angular/platform-browser";
import {ChartDataModel} from "../../../../model/chart-data.model";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {PrefilledSystemParametersListType, PrefilledSystemParametersMap} from "../../../../dictionaries/prefilled-system-parameters-set";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: "app-calculate-values-form",
  templateUrl: "./calculate-values-form.component.html",
  styleUrls: ["./calculate-values-form.component.less"]
})
export class CalculateValuesFormComponent implements OnInit {

  @ViewChild(MatSelectionList)
  private prefilledSystemList: MatSelectionList;

  @ViewChild("compareModeDialog")
  public compareModeDialog: TemplateRef<unknown>;

  public systemParametersForm: FormGroup;
  public isBrowser = false;

  public parameters = SystemParameters;
  public rangeParameterControl: FormControl;
  public systemCharacteristicParameterControl: FormControl;

  public isCompareMode = false;
  public compareModeSwitch = false;
  public compareModeDialogVisible = false;

  public systemName = "";

  public charts: ChartDataModel[] = [];

  public prefilledSystemTypes: PrefilledSystemParametersListType;

  public systemParameters = Array.from(SystemParametersDictionary).map(([key, value]) => {
    return {
      id: key,
      value: this.sanitizer.bypassSecurityTrustHtml(value),
    };
  });

  public availableSystemCharacteristics = Array.from(AvailableSystemCharacteristicsDictionary).map(([key, value]) => {
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
              private sanitizer: DomSanitizer,
  )
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const systemType: SystemType = this.route.snapshot.queryParamMap.get("systemType") as SystemType;
    this.systemName = SystemTypeDictionary.get(systemType);
    this.prefilledSystemTypes = PrefilledSystemParametersMap.get(systemType);
    this.systemCharacteristicParameterControl = new FormControl([], Validators.required);
    this.createForm();

    this.systemParametersForm.valueChanges.subscribe(() => {
      this.prefilledSystemList.deselectAll();
    });

    this.rangeParameterControl.valueChanges.subscribe((v) => {
      this.systemParametersForm.get(v)?.patchValue(1);
    });
  }

  private createForm(): void {
    this.systemParametersForm = new FormGroup({});
    this.rangeParameterControl = new FormControl(SystemParameters.LAMBDA);
    this.systemParametersForm.registerControl("rangeParameter", this.rangeParameterControl);
    this.systemParametersForm.registerControl("systemType", new FormControl(this.route.snapshot.queryParamMap.get("systemType")));
    this.systemParametersForm.registerControl("step", new FormControl(1, [Validators.min(0.1), Validators.max(2)]));
    this.systemParametersForm.registerControl("rangeFrom", new FormControl(1.0));
    this.systemParametersForm.registerControl("rangeTo", new FormControl(2.1));
    Object.values(this.parameters).forEach((parameter) => {
      const control = new FormControl(1, [Validators.min(0.1), Validators.max(10)]);
      this.systemParametersForm.registerControl(parameter, control);
    });
  }

  private processTheorySummary(summary: TheorySummaryModel): void {
    this.charts = [];
    (this.systemCharacteristicParameterControl.value as Array<{id: string, value: string}>).forEach((v) => {
      this.charts.push({
        id: v.id,
        xAxisName: SystemParametersDictionary.get(this.rangeParameterControl.value),
        title: v.value,
        data: summary.result.map((value, i) => [summary.parameter_range[i], value[v.id]]),
      });
    });
    this.cdr.markForCheck();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(MultChannelRejectPopoverComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public onPrefilledParameterSelect(event: MatSelectionListChange): void {
    this.systemParametersForm.patchValue(event.options[0].value);
  }

  public onCompareModeChange(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.dialog.open(this.compareModeDialog, { disableClose: true });
    } else {
      this.isCompareMode = false;
    }
    this.cdr.markForCheck();
  }

  public onCompareParametersApply(): void {
    this.isCompareMode = true;
  }

  public onCompareDialogCancel(): void {
    this.compareModeSwitch = false;
    this.isCompareMode = false;
  }

  public _onSubmit(): void {
    if (this.systemParametersForm.valid && this.systemCharacteristicParameterControl.valid) {
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
}
