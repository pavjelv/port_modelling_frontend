import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingOverlayService} from '../../services/loading-overlay.service';
import {OptimalSizeGenerationService} from '../../services/optimal-size-generation.service';
import {CalculatedSystemParametersModel} from '../../model/calculated-system-parameters.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-calculate-values',
  templateUrl: './calculate-values.component.html',
  styleUrls: ['./calculate-values.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculateValuesComponent implements OnInit {
  public systemParametersForm: FormGroup;
  public wasValidated = false;
  public selected: string = '';
  public valuesCalculated = false;
  public calculatedParameters: CalculatedSystemParametersModel;


  // charts
  public servingProbabilityData: ChartDataSets[] = [];
  public queueLengthData: ChartDataSets[] = [];
  public waitingTimeData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  // @ts-ignore
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
  };
  public probabilityColors: Color[] = [{
      borderColor: 'black',
      backgroundColor: 'rgba(0,239,141,0.62)',
    }
  ];
  public queueLengthColors: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(36,86,250,0.94)',
    },
  ];
  public waitingTimeColors: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(218,18,53,0.94)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  systems = [
    // {value: 'Одноканальная СМО', id: '1'},
    {value: 'Многоканальная СМО с отказами', id: '2'},
    {value: 'Многоканальная СМО с ограниченной очередью', id: '3'}
  ];
  constructor(private fb: FormBuilder,
              private loadingService: LoadingOverlayService,
              private optimalSizeService: OptimalSizeGenerationService,
              private cdr: ChangeDetectorRef,
              )
  { }

  ngOnInit(): void {
    this.systemParametersForm = this.fb.group({
      lambda: [0, [Validators.required, Validators.min(0.1)]],
      t: [0, [Validators.required, Validators.min(0.1)]],
      m: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get lambda() {
    return this.systemParametersForm.get('lambda');
  }

  get t() {
    return this.systemParametersForm.get('t');
  }

  get m() {
    return this.systemParametersForm.get('m');
  }

  public onSelectionChange(): void {
    this.valuesCalculated = false;
  }

  public isInvalid(value: AbstractControl | null) {
    return (
      value?.invalid && (this.wasValidated || value.dirty || value.touched)
    );
  }

  private processCalculatedParameters(): void {
    this.lineChartLabels = [];
    for (let i = 1; i <= this.calculatedParameters.probabilityChanges.length; i++) {
      this.lineChartLabels.push(i + '');
    }
    this.servingProbabilityData = [{
        data: this.calculatedParameters.probabilityChanges,
        label: 'Вероятность обслуживания.',
      },
    ];
    this.queueLengthData = [{
      data: this.calculatedParameters.queueLength,
      label: 'Средняя длина очереди',
    }];
    this.waitingTimeData = [{
      data: this.calculatedParameters.waitingTime,
      label: 'Среднее время ожидания',
    }];
    this.cdr.detectChanges();
  }

  _onSubmit(): void {
    this.wasValidated = true;
    if (this.systemParametersForm.valid) {
        this.loadingService.showLoading();
        if (this.selected === '3') {
          this.optimalSizeService.calculateWithQueue(this.systemParametersForm.value)
            .subscribe((params) => {
              this.loadingService.hideLoading();
              this.valuesCalculated = true;
              this.calculatedParameters = params;
              this.processCalculatedParameters();
              console.log(params);
            });
        } else if (this.selected === '2') {
          this.optimalSizeService.calculateWithoutQueue(this.systemParametersForm.value)
            .subscribe((params) => {
              this.loadingService.hideLoading();
              this.valuesCalculated = true;
              this.calculatedParameters = params;
              this.processCalculatedParameters();
              console.log(params);
            });
        }
    }
  }

}
