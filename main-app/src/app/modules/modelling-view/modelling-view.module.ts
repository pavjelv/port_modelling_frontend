import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { ModellingDescriptionComponent } from "./components/description/modelling-description.component";
import { ModellingViewComponent } from "./modelling-view.component";

const routes: Routes = [
    {
        path: "",
        component: ModellingViewComponent,
    },
];

@NgModule({
    declarations: [ModellingViewComponent, ModellingDescriptionComponent],
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
        MatToolbarModule,
    ],
    exports: [RouterModule, ModellingViewComponent],
})
export class ModellingViewModule {}
