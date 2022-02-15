import {ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {isPlatformBrowser} from "@angular/common";
import {SimulationVariablesModel} from "../../model/simulation/simulation-variables.model";
import {SimulationParameters} from "../../model/simulation/simulation-parameters";

@Component({
  selector: "app-view-modelling",
  styleUrls: ["./modelling-view.component.less"],
  templateUrl: "./modelling-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModellingViewComponent implements OnInit {
  public systemParametersForm: FormGroup;
  public isBrowser = false;

  public parameters = SimulationParameters;
  public controlToParameterMap: Map<SimulationParameters, FormControl> = new Map<SimulationParameters, FormControl>();

  public simulationVariables: { systemVariables: SimulationVariablesModel };

  constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.systemParametersForm = new FormGroup({});
    Object.values(this.parameters).forEach((parameter) => {
      const control = new FormControl(parameter === SimulationParameters.TIME ? 20 : 2);
      this.controlToParameterMap.set(parameter, control);
      this.systemParametersForm.registerControl(parameter, control);
    });
    this.systemParametersForm.valueChanges.subscribe((v) => {
      if (this.systemParametersForm.valid) {
        this.simulationVariables = { systemVariables: this.systemParametersForm.value };
      }
    });
  }
}
