import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from "@angular/cdk/stepper";
import { isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injectable, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewChildren, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatStepper, MatStepperIntl } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";
import { modellingSystemCharacteristicsDictionary } from "../../dictionaries/modelling-system-characteristics.dictionary";
import { AdditionalShipTypeParameters, DistributionsType, SimulationParameters } from "../../model/simulation/simulation-parameters";
import { SimulationVariablesModel } from "../../model/simulation/simulation-variables.model";
import { RxUnsubscribe } from "../../utils/rx-unsubscribe";

@Injectable({
    providedIn: "any",
})
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
            useFactory: (translate: TranslateService): StepperIntl => new StepperIntl(translate),
            deps: [TranslateService],
        },
    ],
})
export class ModellingViewComponent extends RxUnsubscribe implements OnInit, OnDestroy {
    @ViewChild(MatStepper)
    private stepper: MatStepper;

    @ViewChildren(MatInput)
    private inputs: MatInput[];

    @ViewChildren(MatSelect)
    private dropdowns: MatSelect[];

    public systemParametersForm: FormGroup;
    public additionalShipTypeForm: FormGroup;
    public modelParametersForm: FormGroup;
    public commonParametersForm: FormGroup;
    public expensesForm: FormGroup;
    public isBrowser = false;
    public selectedDistribution: DistributionsType = DistributionsType.POISSON;

    public parameters = SimulationParameters;
    public additionalShipTypeParameters = AdditionalShipTypeParameters;

    public simulationVariables: { systemVariables: SimulationVariablesModel };

    public readonly modellingSystemCharacteristics = modellingSystemCharacteristicsDictionary;

    public distributions = [
        { value: "Пуассоновский", id: DistributionsType.POISSON },
        { value: "Равномерный", id: DistributionsType.UNIFORM },
    ];

    private lastFormValue: Record<string, unknown> = null;
    private lastAdditionalParametersFormValue: Record<string, unknown> = null;

    constructor(@Inject(PLATFORM_ID) private platformId: unknown, private fb: FormBuilder, private cdr: ChangeDetectorRef, private _matStepperIntl: MatStepperIntl, private snackBar: MatSnackBar) {
        super();
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public ngOnInit(): void {
        this.modelParametersForm = this.fb.group({
            arrivalDistribution: [this.distributions[0].id, [Validators.required]],
            requiredCharacteristics: [null, [Validators.required]],
            time: [35, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
        });
        this.systemParametersForm = this.fb.group({
            serversNum: [5, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
            serveTime: [2.03, [Validators.required, Validators.min(0)]],
            lambda: [2.56, [Validators.required, Validators.min(0)]],
            queueLength: [7, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
            a1: [0.5, Validators.required],
            b1: [1, Validators.required],
        });
        this.additionalShipTypeForm = this.fb.group({
            serveTimeCargo: [1.5, [Validators.min(0)]],
            cargoAppearanceProbability: [0, [Validators.min(0), Validators.max(1)]],
            cargoServersNum: [1, [Validators.min(0), Validators.pattern("^[0-9]*$")]],
            a2: [0.5, Validators.required],
            b2: [1, Validators.required],
        });

        this.expensesForm = this.fb.group({
            waitCost: [80.8, Validators.min(0)],
            idleCost: [12.8, Validators.min(0)],
        });

        this.commonParametersForm = this.fb.group({
            1: this.systemParametersForm,
            2: this.modelParametersForm,
        });

        this.modelParametersForm
            .get(SimulationParameters.ARRIVAL_DISTRIBUTION)
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                this.selectedDistribution = value;
            });
    }

    public getControl(controlName: string): AbstractControl {
        return this.systemParametersForm.get(controlName) ?? this.additionalShipTypeForm.get(controlName) ?? this.modelParametersForm.get(controlName) ?? this.expensesForm.get(controlName);
    }

    public getErrorMessage(controlName: string): string {
        const formControl = this.getControl(controlName);
        if (formControl.hasError("required")) {
            return "port-modelling-fe.validations.required";
        }
        if (formControl.hasError("min")) {
            return "port-modelling-fe.validations.min";
        }
        if (formControl.hasError("max")) {
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
                        panelClass: "system-example-create-model-snackbar",
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

    private validateAdditionalTypesForm(): boolean {
        return !(
            this.additionalShipTypeForm.get("serveTimeCargo").value === 0 ||
            this.additionalShipTypeForm.get("cargoAppearanceProbability").value === 0 ||
            this.additionalShipTypeForm.get("cargoServersNum").value === 0
        );
    }

    private findInvalidControls(): FormControl[] {
        const invalid: FormControl[] = [];
        const controls = { ...this.modelParametersForm.controls, ...this.systemParametersForm.controls };
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(controls[name] as FormControl);
            }
        }
        return invalid;
    }

    private navigateToFirstInvalid(): void {
        const controls = this.findInvalidControls();
        if (controls.length) {
            const firstInvalid = controls[0];
            this.inputs?.find((input) => input.ngControl.control === firstInvalid)?.focus();
            this.dropdowns?.find((input) => input.ngControl.control === firstInvalid)?.focus();
        }
    }

    public applyValues(): void {
        this.systemParametersForm.markAllAsTouched();
        this.additionalShipTypeForm.markAllAsTouched();
        this.modelParametersForm.markAllAsTouched();
        if (this.systemParametersForm.valid && this.modelParametersForm.valid) {
            if (this.isFormsValueChanged()) {
                this.lastFormValue = this.systemParametersForm.value;
                this.lastAdditionalParametersFormValue = this.additionalShipTypeForm.value;
            }
            const variables = {
                systemVariables: {
                    ...this.systemParametersForm.value,
                    ...this.modelParametersForm.value,
                    ...this.expensesForm.value,
                },
            };
            if (this.validateAdditionalTypesForm()) {
                variables.systemVariables = {
                    ...variables.systemVariables,
                    ...this.additionalShipTypeForm.value,
                    needSecondType: true,
                };
            }
            this.simulationVariables = variables;
            this.stepper.next();
        } else {
            this.navigateToFirstInvalid();
        }
    }
}
