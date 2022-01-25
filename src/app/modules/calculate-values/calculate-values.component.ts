import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoadingOverlayService} from "../../services/loading-overlay.service";
import {OptimalSizeGenerationService} from "../../services/optimal-size-generation.service";
import {ChartDataSets} from "chart.js";
import {Color, Label} from "ng2-charts";
import {isPlatformBrowser} from "@angular/common";
import {SystemParameters, SystemType} from "../../model/system-type";
import {queueLengthColors, servingProbabilityColors, systemWaitingTimeColors} from "./chart-colors.const";
import {TheorySummaryModel} from "../../model/theory-summary.model";

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

  // charts
  public servingProbabilityData: ChartDataSets[] = [];
  public queueLengthData: ChartDataSets[] = [];
  public systemTimeData: ChartDataSets[] = [];
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
              private optimalSizeService: OptimalSizeGenerationService,
              private cdr: ChangeDetectorRef,
              )
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.systemParametersForm = new FormGroup({});
    this.rangeParameterControl = new FormControl(SystemParameters.LAMBDA);
    this.rangeParameterControl.valueChanges.subscribe((v) => {
      this.systemParametersForm.enable({ emitEvent: false });
      this.systemParametersForm.get(v).disable();
    });
    this.systemParametersForm.registerControl("systemType", new FormControl(SystemType.WITH_QUEUE));
    this.systemParametersForm.registerControl("rangeParameter", this.rangeParameterControl);
    Object.values(this.parameters).forEach((parameter) => {
      const disabled = parameter === SystemParameters.LAMBDA;
      this.systemParametersForm.registerControl(parameter, new FormControl({value: 2, disabled}));
    });
    this.systemParametersForm.valueChanges.subscribe((v) => {
      this._onSubmit();
    });
  }

  private processTheorySummary(summary: TheorySummaryModel): void {
    this.lineChartLabels = summary.parameter_range.map((v => v + ""));
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
      }, (error: unknown) => {
        console.error(error);
      });
  }

}
