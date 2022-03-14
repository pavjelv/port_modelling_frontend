import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject, Injectable, OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {isPlatformBrowser} from "@angular/common";
import {SimulationVariablesModel} from "../../model/simulation/simulation-variables.model";
import {AdditionalShipTypeParameters, SimulationParameters} from "../../model/simulation/simulation-parameters";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepperIntl} from "@angular/material/stepper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RxUnsubscribe} from "../../utils/rx-unsubscribe";
import {takeUntil} from "rxjs/operators";


@Injectable()
export class StepperIntl extends MatStepperIntl {
   optionalLabel = "Необязательно";
}

@Component({
  selector: "app-view-modelling",
  styleUrls: ["./modelling-view.component.less"],
  templateUrl: "./modelling-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    {
      provide: MatStepperIntl,
      useClass: StepperIntl
    },
  ],
})
export class ModellingViewComponent extends RxUnsubscribe implements OnInit, OnDestroy {

  public systemParametersForm: FormGroup;
  public additionalShipTypeForm: FormGroup;
  public isBrowser = false;

  public parameters = SimulationParameters;
  public additionalShipTypeParameters = AdditionalShipTypeParameters;

  public simulationVariables: { systemVariables: SimulationVariablesModel };

  public distributions = [
    { value: "Пуассоновский", id: "poisson" }
  ];

  private lastFormValue: Record<string, unknown> = null;
  private lastAdditionalParametersFormValue: Record<string, unknown> = null;

  constructor(@Inject(PLATFORM_ID) private platformId: unknown,
              private cdr: ChangeDetectorRef,
              private _matStepperIntl: MatStepperIntl,
              private snackBar: MatSnackBar) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public ngOnInit(): void {
    this.systemParametersForm = new FormGroup({});
    Object.values(this.parameters).forEach((parameter) => {
      const control = new FormControl(null, Validators.required);
      this.systemParametersForm.registerControl(parameter, control);
    });

    this.additionalShipTypeForm = new FormGroup({});
    Object.values(this.additionalShipTypeParameters).forEach((parameter) => {
      const control = new FormControl(null, Validators.required);
      this.additionalShipTypeForm.registerControl(parameter, control);
    });
  }

  public onStepSelectChange(event: StepperSelectionEvent): void {
    if (event.selectedIndex === 2) {
      if (this.isFormsValueChanged()) {
        let message = "Параметры системы были изменены";
        if (this.lastFormValue === null) {
          message = "Необходимые параметры заполнены";
        }
        this.snackBar.open(message, "Смоделировать", {
          horizontalPosition: "right",
          verticalPosition: "top",
        }).onAction().pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.applyValues();
          this.cdr.detectChanges();
        });
      }
    } else {
      this.snackBar.dismiss();
    }
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.snackBar.dismiss();
  }

  private isFormsValueChanged(): boolean {
    if (this.lastFormValue === null) {
      return true;
    }
    let isUnchanged = true;
    Object.entries(this.systemParametersForm.value).forEach(([key, value]) => {
      isUnchanged = isUnchanged && this.lastFormValue[key] === value;
    });
    if (this.additionalShipTypeForm.valid) {
      Object.entries(this.additionalShipTypeForm.value).forEach(([key, value]) => {
        isUnchanged = isUnchanged && this.lastAdditionalParametersFormValue[key] === value;
      });
    }
    return !isUnchanged;
  }

  public applyValues(): void {
    if (this.systemParametersForm.valid) {
      if (this.isFormsValueChanged()) {
        this.lastFormValue = this.systemParametersForm.value;
        this.lastAdditionalParametersFormValue = this.additionalShipTypeForm.value;
      }
      const variables = { systemVariables: this.systemParametersForm.value };
      if (this.additionalShipTypeForm.valid) {
        variables.systemVariables = {
          ...variables.systemVariables,
          ...this.additionalShipTypeForm.value,
          needSecondType: true,
        };
      }
      this.simulationVariables = variables;
    }
  }
}
