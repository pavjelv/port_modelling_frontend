import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    TemplateRef,
    ViewChild,
} from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
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
import {
    MatSelectionList,
    MatSelectionListChange,
} from "@angular/material/list";
import {
    PrefilledSystemParametersListType,
    PrefilledSystemParametersMap,
} from "../../../../dictionaries/prefilled-system-parameters-set";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { RxUnsubscribe } from "../../../../utils/rx-unsubscribe";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-calculate-values-form",
    templateUrl: "./calculate-values-form.component.html",
    styleUrls: ["./calculate-values-form.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculateValuesFormComponent extends RxUnsubscribe implements OnInit, OnDestroy {
    @ViewChild(MatSelectionList)
    private prefilledSystemList: MatSelectionList;

    @ViewChild("compareModeDialog")
    public compareModeDialog: TemplateRef<unknown>;

    @ViewChild("compareModeDescription")
    public compareModeDescriptionDialog: TemplateRef<unknown>;

    @ViewChild("mmcDialogTemplate")
    public mmcSystemDialog: TemplateRef<unknown>;

    @ViewChild("mmccDialogTemplate")
    public mmccSystemDialog: TemplateRef<unknown>;

    @ViewChild("mmckDialogTemplate")
    public mmckSystemDialog: TemplateRef<unknown>;

    public systemParametersForm: FormGroup;
    public isBrowser = false;

    public parameters = SystemParameters;
    public rangeParameterControl: FormControl;
    public systemCharacteristicParameterControl: FormControl;

    public isCompareMode = false;
    public compareModeSwitch = false;
    public compareModeDialogVisible = false;
    public savedSystemVariables: Array<string> = new Array<string>();
    public systemVariablesToCalculatedDataMap: Map<string, Map<string, ChartSeriesData>> = new Map<string, Map<string, ChartSeriesData>>();

    public systemName = "";
    public hasQueue = false;
    private systemType: SystemType;

    public charts: ChartDataModel[] = [];

    public prefilledSystemTypes: PrefilledSystemParametersListType;

    public systemParameters: Array<{id: string; value: string}>;

    public availableSystemCharacteristics: Array<{id: string; value: string}>;

    constructor(
        private fb: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: unknown,
        private loadingService: LoadingOverlayService,
        private optimalSizeService: TheoryResultsService,
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
            .filter(([k, v]) => {
                if (systemType === SystemType.WITH_REJECT) {
                    return k !== "l_queue" && k !== "wait";
                } else if (systemType === SystemType.INFINITE_QUEUE) {
                    return k !== "l_queue";
                }
                return true;
            })
            .map(([key, value]) => {
                return {
                    id: key,
                    value,
                };
            });
        this.systemParameters = Array.from(SystemParametersDictionary)
            .filter(([k, v]) => (this.hasQueue || k !== SystemParameters.QUEUE_LENGTH))
            .map(([key, value]) => {
                return {
                    id: key,
                    value,
                };
            });

        this.systemName = SystemTypeDictionary.get(systemType);
        this.prefilledSystemTypes = PrefilledSystemParametersMap.get(systemType);
        this.systemCharacteristicParameterControl = new FormControl([], Validators.required);
        this.createForm(systemType);

        this.systemParametersForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.prefilledSystemList.deselectAll();
        });

        this.rangeParameterControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
            this.systemParametersForm.get(v)?.patchValue(1);
        });
    }

    private createForm(systemType: string): void {
        this.systemParametersForm = this.fb.group({
            systemType: [systemType, Validators.required],
            step: [1, [Validators.required, Validators.min(0.1), Validators.max(2)]],
            rangeFrom: [1.0, [Validators.required, Validators.min(0.1), Validators.max(10)]],
            rangeTo: [2.0, [Validators.required, Validators.min(0.2), Validators.max(10)]],
            serversNum: [2, [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern("^[0-9]*$")]],
            queueLength: [2, [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern("^[0-9]*$")]],
            serveTime: [0.5, [Validators.required, Validators.min(0.1), Validators.max(5)]],
            lambda: [0.5, [Validators.required, Validators.min(0.1), Validators.max(5)]],
        });
        this.rangeParameterControl = new FormControl(SystemParameters.LAMBDA);
        this.systemParametersForm.registerControl("rangeParameter", this.rangeParameterControl);
    }

    private createSeriesName({ lambda, serveTime, serversNum, queueLength }: any): string {
        return `&lambda;: ${lambda}, t: ${serveTime}, n: ${serversNum}, m: ${queueLength}`;
    }

    public removeSeries(key: string): void {
        const index = this.savedSystemVariables.indexOf(key);
        if (index !== -1) {
            this.savedSystemVariables.splice(index, 1);
            this.systemVariablesToCalculatedDataMap.delete(key);
            this.charts = [];
            (this.systemCharacteristicParameterControl.value as Array<{ id: string; value: string }>).forEach((v) => {
                const data = Array.from(this.systemVariablesToCalculatedDataMap.entries())
                    .reduce((aggregator, [k, value]) => aggregator.set(k, value.get(v.id)), new Map<string, ChartSeriesData>());
                this.charts.push({
                    id: v.id,
                    xAxisName: SystemParametersDictionary.get(this.rangeParameterControl.value),
                    title: v.value,
                    data,
                });
            });
            this.cdr.markForCheck();
        }
    }

    private processTheorySummary(summary: TheorySummaryModel): void {
        this.charts = [];
        if (this.isCompareMode) {
            const key = this.createSeriesName(this.systemParametersForm.getRawValue());
            if (!this.systemVariablesToCalculatedDataMap.has(key)) {
                const chartsData = new Map<string, ChartSeriesData>();
                (this.systemCharacteristicParameterControl.value as Array<{ id: string; value: string }>).forEach((v) => {
                    chartsData.set(
                        v.id,
                        summary.result.map((value, i) => [summary.parameter_range[i], value[v.id]]),
                    );
                });
                this.savedSystemVariables.push(key);
                this.systemVariablesToCalculatedDataMap.set(key, chartsData);
            }
        }
        (this.systemCharacteristicParameterControl.value as Array<{ id: string; value: string }>).forEach((v) => {
            const data = this.isCompareMode
                ? Array.from(this.systemVariablesToCalculatedDataMap.entries())
                    .reduce(
                        (aggregator, [key, value]) => aggregator.set(key, value.get(v.id)), new Map<string, ChartSeriesData>()
                    )
                : new Map<string, ChartSeriesData>([
                    ["series", summary.result.map((value, i) => [summary.parameter_range[i], value[v.id]]) as ChartSeriesData]
                ]);
            this.charts.push({
                id: v.id,
                xAxisName: this.translateService.instant(SystemParametersDictionary.get(this.rangeParameterControl.value)),
                title: v.value,
                data,
            });
        });
        this.cdr.markForCheck();
    }

    public getControl(controlName: string): AbstractControl {
        return this.systemParametersForm.get(controlName);
    }

    public getErrorMessage(controlName: string): string {
        const formControl = this.systemParametersForm.get(controlName) as FormControl;
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
                this.dialog.open(this.mmcSystemDialog);
                break;
            case SystemType.WITH_REJECT:
                this.dialog.open(this.mmccSystemDialog);
                break;
            case SystemType.WITH_QUEUE:
                this.dialog.open(this.mmckSystemDialog);
                break;
            default:
                break;
        }
    }

    public openCompareModeDescriptionDialog(): void {
        this.dialog.open(this.compareModeDescriptionDialog);
    }

    public onPrefilledParameterSelect(event: MatSelectionListChange): void {
        this.systemParametersForm.patchValue(event.options[0].value);
    }

    public onCompareModeChange(event: MatSlideToggleChange): void {
        if (event.checked) {
            this.dialog.open(this.compareModeDialog, { disableClose: true });
        } else {
            this.isCompareMode = false;
            this.systemVariablesToCalculatedDataMap = new Map<string, Map<string, ChartSeriesData>>();
            this.savedSystemVariables = [];
            this.charts = [];
        }
        this.cdr.markForCheck();
    }

    public onCompareParametersApply(): void {
        this.systemParametersForm.markAllAsTouched();
        this.systemCharacteristicParameterControl.markAllAsTouched();
        if (this.systemParametersForm.valid && this.systemCharacteristicParameterControl.valid) {
            this.isCompareMode = true;
            this.savedSystemVariables = [];
            this.charts = [];
            this.dialog.closeAll();
        }
        this.cdr.markForCheck();
    }

    public onCompareDialogCancel(): void {
        this.compareModeSwitch = false;
        this.isCompareMode = false;
        this.cdr.markForCheck();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public _onSubmit(): void {
        this.systemParametersForm.markAllAsTouched();
        this.systemCharacteristicParameterControl.markAllAsTouched();
        if (this.systemParametersForm.valid && this.systemCharacteristicParameterControl.valid) {
            this.loadingService.showLoading();
            this.optimalSizeService
                .calculateWithQueue(this.systemParametersForm.getRawValue())
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (summary) => {
                        this.loadingService.hideLoading();
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
