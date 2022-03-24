import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injectable, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { isPlatformBrowser } from "@angular/common";
import { SimulationVariablesModel } from "../../model/simulation/simulation-variables.model";
import { AdditionalShipTypeParameters, SimulationParameters } from "../../model/simulation/simulation-parameters";
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from "@angular/cdk/stepper";
import { MatStepperIntl } from "@angular/material/stepper";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RxUnsubscribe } from "../../utils/rx-unsubscribe";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class StepperIntl extends MatStepperIntl {
    constructor(private translateService: TranslateService) {
        super();
    }
    optionalLabel = this.translateService.instant("port-modelling-fe.modellingView.notRequired");
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
            useValue: { displayDefaultIndicatorType: false },
        },
        {
            provide: MatStepperIntl,
            useFactory: (translate: TranslateService) => new StepperIntl(translate),
            deps: [TranslateService],
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

    public distributions = [{ value: "Пуассоновский", id: "poisson" }];

    private lastFormValue: Record<string, unknown> = null;
    private lastAdditionalParametersFormValue: Record<string, unknown> = null;

    constructor(@Inject(PLATFORM_ID) private platformId: unknown,
                private fb: FormBuilder,
                private cdr: ChangeDetectorRef,
                private _matStepperIntl: MatStepperIntl,
                private snackBar: MatSnackBar) {
        super();
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public ngOnInit(): void {
        this.systemParametersForm = this.fb.group({
            arrivalDistribution: [null, [Validators.required]],
            serversNum: [1, [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern("^[0-9]*$")]],
            serveTime: [0.5, [Validators.required, Validators.min(0.1), Validators.max(5)]],
            lambda: [0.5, [Validators.required, Validators.min(0.1), Validators.max(4)]],
            queueLength: [3, [Validators.required, Validators.min(0), Validators.max(8), Validators.pattern("^[0-9]*$")]],
            time: [35, [Validators.required, Validators.min(20), Validators.max(50), Validators.pattern("^[0-9]*$")]],
        });
        this.additionalShipTypeForm = this.fb.group({
            serveTimeCargo: [null, [Validators.required, Validators.min(0.1), Validators.max(7)]],
            cargoAppearanceProbability: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
            cargoServersNum: [null, [Validators.required, Validators.min(1), Validators.max(3), Validators.pattern("^[0-9]*$")]],
        });
    }

    public getControl(controlName: string): AbstractControl {
        return this.systemParametersForm.get(controlName) ?? this.additionalShipTypeForm.get(controlName);
    }

    public getErrorMessage(controlName: string): string {
        const formControl = this.systemParametersForm.get(controlName) ?? this.additionalShipTypeForm.get(controlName);
        if (formControl.hasError("required")) {
            return "port-modelling-fe.validations.required";
        } else if (formControl.hasError("min")) {
            return "port-modelling-fe.validations.min";
        } else if (formControl.hasError("max")) {
            return "port-modelling-fe.validations.max";
        }
        return "port-modelling-fe.validations.incorrectValue";
    }

    public onStepSelectChange(event: StepperSelectionEvent): void {
        if (event.selectedIndex === 3) {
            if (this.isFormsValueChanged()) {
                let message = "Параметры системы были изменены";
                if (this.lastFormValue === null) {
                    message = "Необходимые параметры заполнены";
                }
                this.snackBar
                    .open(message, "Смоделировать", {
                        horizontalPosition: "right",
                        verticalPosition: "top",
                        panelClass: "system-example-create-model-snackbar"
                    })
                    .onAction()
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
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
