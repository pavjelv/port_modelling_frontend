import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {isPlatformBrowser} from "@angular/common";
import {SimulationVariablesModel} from "../../model/simulation/simulation-variables.model";
import {SimulationParameters} from "../../model/simulation/simulation-parameters";
import {MatDrawer} from "@angular/material/sidenav";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: "app-view-modelling",
  styleUrls: ["./modelling-view.component.less"],
  templateUrl: "./modelling-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModellingViewComponent implements OnInit {

  @ViewChild("drawer")
  public drawer: MatDrawer;

  public systemParametersForm: FormGroup;
  public isBrowser = false;
  public showDifferentShips = false;

  public parameters = SimulationParameters;
  public controlToParameterMap: Map<SimulationParameters, FormControl> = new Map<SimulationParameters, FormControl>();

  public simulationVariables: { systemVariables: SimulationVariablesModel };

  public distributions = [
    { value: "Пуассоновский", id: "poisson" }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: unknown,
              private cdr: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.systemParametersForm = new FormGroup({});
    Object.values(this.parameters).forEach((parameter) => {
      const control = new FormControl(parameter === SimulationParameters.TIME ? 20 : 2);
      this.controlToParameterMap.set(parameter, control);
      this.systemParametersForm.registerControl(parameter, control);
    });
    this.controlToParameterMap.get(SimulationParameters.NEED_SECOND_TYPE).setValue(false);
    this.controlToParameterMap.get(SimulationParameters.ARRIVAL_DISTRIBUTION).setValue("poisson");
    this.controlToParameterMap.get(SimulationParameters.CONTAINER_APPEARANCE_PROBABILITY).setValue(0.2);
  }

  applyValues(): void {
    if (this.systemParametersForm.valid) {
      this.simulationVariables = { systemVariables: this.systemParametersForm.value };
      this.drawer.close().then();
    }
  }

  public toggleChange(event: MatSlideToggleChange): void {
    this.showDifferentShips = event.checked;
    this.cdr.markForCheck();
  }
}
