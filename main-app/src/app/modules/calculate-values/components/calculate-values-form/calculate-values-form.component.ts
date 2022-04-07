import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import {
    SystemParameters,
    SystemType,
} from "../../../../model/theory/system-type";
import { LoadingOverlayService } from "../../../../services/loading-overlay.service";
import { TheoryResultsService } from "../../../../services/theory-results.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { isPlatformBrowser } from "@angular/common";
import { TheorySummaryModel } from "../../../../model/theory/theory-summary.model";
import { ActivatedRoute } from "@angular/router";
import { SystemTypeDictionary } from "../../../../dictionaries/system-type.dictionary";
import { MatDialog } from "@angular/material/dialog";
import {
    AvailableSystemCharacteristicsDictionary,
    SystemParametersDictionary,
} from "../../../../dictionaries/available-system-characteristics.dictionary";
import { DomSanitizer } from "@angular/platform-browser";
import {
    ChartDataModel,
    ChartSeriesData,
} from "../../../../model/chart-data.model";
import { RxUnsubscribe } from "../../../../utils/rx-unsubscribe";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { MMCSystemComponent } from "../../../../components/m-m-c-system/m-m-c-system.component";
import { MMCCSystemComponent } from "../../../../components/m-m-c-c-system/m-m-c-c-system.component";
import { MMCKSystemComponent } from "../../../../components/m-m-c-k-system/m-m-c-k-system.component";
import { SatPopover } from "@ncstate/sat-popover";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { SystemVariablesModel } from "../../../../model/theory/system-variables.model";
import {
    RangeParameterData,
    SystemCharacteristicTableModel,
} from "../../../../model/theory/system-characteristic-table.model";
import { AvailableSystemCharacteristics } from "../../../../model/theory/theory-result.model";

@Component({
    selector: "app-calculate-values-form",
    templateUrl: "./calculate-values-form.component.html",
    styleUrls: ["./calculate-values-form.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculateValuesFormComponent extends RxUnsubscribe implements OnInit, OnDestroy {
    @ViewChild(SatPopover)
    public popover: SatPopover;

    @ViewChild("chartsStepElement")
    public chartsStepElement: ElementRef<HTMLDivElement>;

    public systemParametersForm: FormGroup;
    public rangeParameterForm: FormGroup;
    public isBrowser = false;

    public parameters = SystemParameters;

    public systemName = "";
    public hasQueue = false;
    private systemType: SystemType;

    public charts: ChartDataModel[] = [];
    public chartWidth = 700;

    public availableSystemCharacteristics: Array<SystemCharacteristicTableModel>;

    public displayedColumns: string[] = ["characteristic", "lambda", "s", "c", "k"];

    constructor(
        private fb: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: unknown,
        private loadingService: LoadingOverlayService,
        private theoryResultsService: TheoryResultsService,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private sanitizer: DomSanitizer,
        private translateService: TranslateService,
    ) {
        super();
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        const systemType: SystemType = this.route.snapshot.queryParamMap.get("systemType") as SystemType;
        this.hasQueue = systemType === SystemType.WITH_QUEUE;
        this.systemType = systemType;
        this.availableSystemCharacteristics = Array.from(AvailableSystemCharacteristicsDictionary)
            .filter(([k, _]) => systemType !== SystemType.WITH_REJECT || (k !== "l_queue" && k !== "wait"))
            .map(([key, value]) => {
                return {
                    id: key,
                    value,
                };
            });
        if (systemType === SystemType.WITH_REJECT) {
            this.displayedColumns.pop();
        }

        this.systemName = SystemTypeDictionary.get(systemType);
        this.createForm(systemType);
    }

    private createForm(systemType: string): void {
        this.systemParametersForm = this.fb.group({
            systemType: [systemType, Validators.required],
            serversNum: [2, [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern("^[0-9]*$")]],
            queueLength: [2, [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern("^[0-9]*$")]],
            serveTime: [0.5, [Validators.required, Validators.min(0.1), Validators.max(5)]],
            lambda: [0.5, [Validators.required, Validators.min(0.1), Validators.max(5)]],
        });
        this.rangeParameterForm = this.fb.group({
            systemCharacteristic: [],
            rangeParameter: [],
            step: [0.1, [Validators.required, Validators.min(0.1), Validators.max(2)]],
            rangeFrom: [1.0, [Validators.required, Validators.min(0.1), Validators.max(10)]],
            rangeTo: [5.0, [Validators.required, Validators.min(0.2), Validators.max(10)]],
        });
    }

    private processTheorySummary(summary: TheorySummaryModel[]): void {
        this.charts = [];
        Object.values(this.parameters).forEach((parameter) => {
            this.availableSystemCharacteristics
                .map((v) => ({ id: v.id, p: v[parameter] }))
                .filter((v) => !!v.p)
                .forEach((v) => {
                    const p = v.p;
                    const calculated = summary.find((s) => {
                        return parameter === s.range_name && p.rangeFrom === s.range_from && p.rangeTo === s.range_to && p.step === s.step;
                    });
                    const data = new Map<string, ChartSeriesData>([
                            ["series", calculated.result.map((value, i) => [calculated.parameter_range[i], value[v.id]]) as ChartSeriesData]
                    ]);
                    this.charts.push({
                        id: v.id + parameter,
                        xAxisName: this.translateService.instant(SystemParametersDictionary.get(parameter)),
                        title: AvailableSystemCharacteristicsDictionary.get(v.id),
                        data,
                    });
                });
        });
        this.cdr.markForCheck();
    }

    public getControl(controlName: string): AbstractControl {
        return this.systemParametersForm.get(controlName) ?? this.rangeParameterForm.get(controlName);
    }

    onParameterSelect(event: MatCheckboxChange, parameter: SystemParameters, element: SystemCharacteristicTableModel): void {
        if (parameter === null) {
            this.selectAllParameters(element, event.checked);
            return;
        } else if (element === null) {
            this.selectAllCharacteristics(parameter, event.checked);
            return;
        }
        if (!event.checked) {
            const selectedRow = this.availableSystemCharacteristics
                .find((v) => v.id === element.id);
            delete selectedRow[parameter];
            return;
        }
        this.prepareRangeParameterForm(parameter, element.id);
        this.popover.anchor = event.source._elementRef;
        this.popover.toggle();
    }

    private selectAllCharacteristics(parameter: SystemParameters, isChecked: boolean): void {
        this.availableSystemCharacteristics.forEach((element) => {
            if (isChecked) {
                this.prepareRangeParameterForm(parameter, element.id);
                this.onRangeSelect();
            } else {
                delete element[parameter];
                return;
            }
        });
    }

    private selectAllParameters(element: SystemCharacteristicTableModel, isChecked: boolean): void {
        const selectedRow = this.availableSystemCharacteristics
            .find((v) => v.id === element.id);
        Object.values(SystemParameters).forEach((parameter) => {
            if (isChecked) {
                this.prepareRangeParameterForm(parameter, element.id);
                this.onRangeSelect();
            } else {
                delete selectedRow[parameter];
                return;
            }
        });
    }

    private prepareRangeParameterForm(parameter: SystemParameters, characteristicId: AvailableSystemCharacteristics): void {
        this.rangeParameterForm.get("rangeParameter").setValue(parameter);
        this.rangeParameterForm.get("systemCharacteristic").setValue(characteristicId);
        if (parameter === SystemParameters.SERVERS_NUM || parameter === SystemParameters.QUEUE_LENGTH) {
            this.rangeParameterForm.get("rangeFrom").setValue(1);
            this.rangeParameterForm.get("rangeTo").setValue(5);
            this.rangeParameterForm.get("step").setValue(1);
            this.rangeParameterForm.get("rangeFrom").addValidators([Validators.pattern("^[0-9]*$")]);
            this.rangeParameterForm.get("rangeTo").addValidators([Validators.pattern("^[0-9]*$")]);
            this.rangeParameterForm.get("step").addValidators([Validators.pattern("^[0-9]*$")]);
        } else {
            this.rangeParameterForm.get("rangeFrom").setValue(0.1);
            this.rangeParameterForm.get("rangeTo").setValue(4);
            this.rangeParameterForm.get("step").setValue(0.5);
            this.rangeParameterForm.get("rangeFrom").removeValidators([Validators.pattern("^[0-9]*$")]);
            this.rangeParameterForm.get("rangeTo").removeValidators([Validators.pattern("^[0-9]*$")]);
            this.rangeParameterForm.get("step").removeValidators([Validators.pattern("^[0-9]*$")]);
        }
    }

    onRangeSelect(): void {
        if (this.rangeParameterForm.valid) {
            const selectedRow = this.availableSystemCharacteristics
                .find((v) => v.id === this.rangeParameterForm.get("systemCharacteristic").value);
            selectedRow[this.rangeParameterForm.get("rangeParameter").value] = this.rangeParameterForm.getRawValue();
            this.popover.close();
            this.cdr.markForCheck();
        }
    }

    onCancel(): void {
        this.popover.close();
        this.cdr.markForCheck();
    }

    public getErrorMessage(controlName: string): string {
        const formControl = this.getControl(controlName);
        if (formControl.hasError("required")) {
            return "port-modelling-fe.validations.required";
        } else if (formControl.hasError("min")) {
            return "port-modelling-fe.validations.min";
        } else if (formControl.hasError("max")) {
            return "port-modelling-fe.validations.max";
        }
        return "port-modelling-fe.validations.incorrectValue";
    }

    public openDialog(): void {
        switch (this.systemType) {
            case SystemType.INFINITE_QUEUE:
                this.dialog.open(MMCSystemComponent);
                break;
            case SystemType.WITH_REJECT:
                this.dialog.open(MMCCSystemComponent);
                break;
            case SystemType.WITH_QUEUE:
                this.dialog.open(MMCKSystemComponent);
                break;
            default:
                break;
        }
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private composeRequest(): Array<SystemVariablesModel> {
        let result = [];
        Object.values(this.parameters).forEach((parameter) => {
            const selectedValues = this.availableSystemCharacteristics
                .map((v) => v[parameter] as RangeParameterData)
                .filter((v) => !!v)
                .reduce((aggregator, current) => {
                    const existingValue = aggregator.find((v) => {
                        return v.rangeFrom === current.rangeFrom && v.rangeTo === current.rangeTo && v.step === current.step;
                    });
                    if (!existingValue) {
                        aggregator.push(current);
                    }
                    return aggregator;
                }, []);
            result = [...result, ...selectedValues.map((value) => ({ ...value, ...this.systemParametersForm.getRawValue() }))];
        });
        return result;
    }

    public _onSubmit(): void {
        this.systemParametersForm.markAllAsTouched();
        if (this.systemParametersForm.valid) {
            this.loadingService.showLoading();
            this.theoryResultsService
                .calculateBulk(this.composeRequest())
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (summary) => {
                        this.loadingService.hideLoading();
                        const width = window.getComputedStyle(this.chartsStepElement?.nativeElement).width;
                        this.chartWidth = parseInt(width.replace("px", ""), 10) / 2 - 10;
                        this.processTheorySummary(summary);
                    },
                    (error: Error) => {
                        this.loadingService.hideLoading();
                        console.error(error);
                        this.snackBar.open(error.message, null, {
                            duration: 5000,
                            horizontalPosition: "right",
                            verticalPosition: "top",
                        });
                    },
                );
        }
    }
}
