import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalculateValuesComponent } from "./calculate-values.component";
import {Route, RouterModule} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ChartsModule} from "ng2-charts";
import { SystemAnimationComponent } from "./components/system-animation/system-animation.component";

const routes: Route[] = [
  {
    path: "",
    component: CalculateValuesComponent,
  }
];


@NgModule({
  declarations: [CalculateValuesComponent, SystemAnimationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FlexModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        ChartsModule,
    ]
})
export class CalculateValuesModule { }
