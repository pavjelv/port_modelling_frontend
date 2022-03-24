import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModellingViewComponent } from "./modelling-view.component";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "../../components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { MatTooltipModule } from "@angular/material/tooltip";

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
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule,
        MatStepperModule,
        TranslateModule.forChild(),
        MatTooltipModule,
    ],
    exports: [RouterModule, ModellingViewComponent],
})
export class ModellingViewModule {}
