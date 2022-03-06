import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalculateValuesComponent } from "./calculate-values.component";
import {Route, RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material-experimental/mdc-slider";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HighchartsChartModule } from "highcharts-angular";
import { HighchartWrapperComponent } from "./components/highchart-wrapper/highchart-wrapper.component";
import { CalculateValuesFormComponent } from "./components/calculate-values-form/calculate-values-form.component";
import {MathjaxModule} from "../mathjax/mathjax.module";
import { MultChannelRejectPopoverComponent } from "./components/mult-channel-reject-popover/mult-channel-reject-popover.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const routes: Route[] = [
  {
    path: "form",
    component: CalculateValuesFormComponent,
  },
  {
    path: "**",
    component: CalculateValuesComponent,
  },
];


@NgModule({
  declarations: [CalculateValuesComponent, HighchartWrapperComponent, CalculateValuesFormComponent, MultChannelRejectPopoverComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSliderModule,
        MatSnackBarModule,
        MatRadioModule,
        FormsModule,
        HighchartsChartModule,
        MathjaxModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        ScrollingModule,
        MatTooltipModule,
        MatSlideToggleModule
    ]
})
export class CalculateValuesModule { }
