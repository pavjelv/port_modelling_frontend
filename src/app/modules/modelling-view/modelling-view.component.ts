import {Component, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {isPlatformBrowser} from "@angular/common";
import {SimulationVariablesModel} from "../../model/simulation/simulation-variables.model";
import {SimulationParameters} from "../../model/simulation/simulation-parameters";

@Component({
  selector: "app-homepage",
  styleUrls: ["./modelling-view.component.less"],
  templateUrl: "./modelling-view.component.html",
})
export class ModellingViewComponent implements OnInit {
  public systemParametersForm: FormGroup;
  public isBrowser = false;

  public parameters = SimulationParameters;

  public simulationVariables: SimulationVariablesModel;

  constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.systemParametersForm = new FormGroup({});
    Object.values(this.parameters).forEach((parameter) => {
      this.systemParametersForm.registerControl(parameter, new FormControl(1));
    });
    this.systemParametersForm.valueChanges.subscribe((v) => {
      this.simulationVariables = this.systemParametersForm.value;
    });
  }
}
