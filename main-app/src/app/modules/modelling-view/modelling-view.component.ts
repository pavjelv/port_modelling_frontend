import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject, Injectable,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {isPlatformBrowser, ViewportScroller} from "@angular/common";
import {SimulationVariablesModel} from "../../model/simulation/simulation-variables.model";
import {AdditionalShipTypeParameters, SimulationParameters} from "../../model/simulation/simulation-parameters";
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepperIntl} from "@angular/material/stepper";


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
export class ModellingViewComponent implements OnInit {

  public systemParametersForm: FormGroup;
  public additionalShipTypeForm: FormGroup;
  public isBrowser = false;

  public parameters = SimulationParameters;
  public additionalShipTypeParameters = AdditionalShipTypeParameters;

  public simulationVariables: { systemVariables: SimulationVariablesModel };

  public distributions = [
    { value: "Пуассоновский", id: "poisson" }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: unknown,
              private cdr: ChangeDetectorRef,
              private _matStepperIntl: MatStepperIntl,
              private scroller: ViewportScroller) {
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
      setTimeout(() => {
        this.scroller.scrollToAnchor("applyValuesButton");
      }, 30);
    }
  }

  public applyValues(): void {
    if (this.systemParametersForm.valid) {
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
