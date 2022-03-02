import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SystemParameters} from "../../../../model/theory/system-type";
import {LoadingOverlayService} from "../../../../services/loading-overlay.service";
import {TheoryResultsService} from "../../../../services/theory-results.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {isPlatformBrowser} from "@angular/common";
import {TheorySummaryModel} from "../../../../model/theory/theory-summary.model";
import {ActivatedRoute} from "@angular/router";
import {CalculatedSystemTypeDictionary, SystemTypeDictionary} from "../../../../dictionaries/system-type.dictionary";
import {MatDialog} from "@angular/material/dialog";
import {MultChannelRejectPopoverComponent} from "../mult-channel-reject-popover/mult-channel-reject-popover.component";
import {
  AvailableSystemCharacteristicsDictionary,
  SystemParametersDictionary
} from "../../../../dictionaries/available-system-characteristics.dictionary";
import {DomSanitizer} from "@angular/platform-browser";

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
  public systemCharacteristicParameterControl: FormControl;

  public systemName = "";

  public calculatedSystemTypes = Array.from(CalculatedSystemTypeDictionary).map(([key, value]) => {
    return {
      id: key,
      value,
    };
  });

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
    this.systemName = SystemTypeDictionary.get(this.route.snapshot.queryParamMap.get("systemType"));
    this.systemParametersForm = new FormGroup({});
    this.rangeParameterControl = new FormControl(SystemParameters.LAMBDA);
    this.systemCharacteristicParameterControl = new FormControl([]);
    this.systemParametersForm.registerControl("rangeParameter", this.rangeParameterControl);
    this.systemParametersForm.registerControl("step", new FormControl());
    this.systemParametersForm.registerControl("rangeFrom", new FormControl(1.0));
    this.systemParametersForm.registerControl("rangeTo", new FormControl(2.1));
    Object.values(this.parameters).forEach((parameter) => {
      const control = new FormControl(0, Validators.min(0));
      this.systemParametersForm.registerControl(parameter, control);
    });
  }

  private processTheorySummary(summary: TheorySummaryModel): void {
    // @ts-ignore
    this.chartOptions.series[0].data = summary.result.map(((value, i) => {
      return {
        x: String(summary.parameter_range[i]),
        y: value.p_serv,
      };
    }));
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
