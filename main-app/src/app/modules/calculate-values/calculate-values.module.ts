import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalculateValuesComponent } from "./calculate-values.component";
import {Route, RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ChartsModule} from "ng2-charts";
import {MatSliderModule} from "@angular/material/slider";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes: Route[] = [
  {
    path: "",
    component: CalculateValuesComponent,
  }
];


@NgModule({
  declarations: [CalculateValuesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        ChartsModule,
        MatSliderModule,
        MatSnackBarModule,
        MatRadioModule,
        FormsModule,
    ]
})
export class CalculateValuesModule { }
