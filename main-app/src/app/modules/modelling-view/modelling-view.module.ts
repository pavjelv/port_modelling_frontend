import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModellingViewComponent } from "./modelling-view.component";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "../../components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

const routes: Routes = [
  {
    path: "",
    component: ModellingViewComponent,
  },
];

@NgModule({
  declarations: [ModellingViewComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        ComponentsModule,
        ReactiveFormsModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
    ],
  exports: [RouterModule, ModellingViewComponent],
})
export class ModellingViewModule {}