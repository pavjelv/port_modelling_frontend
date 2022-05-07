import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Route, RouterModule } from "@angular/router";
import { SatPopoverModule } from "@ncstate/sat-popover";
import { TranslateModule } from "@ngx-translate/core";
import { HighchartsChartModule } from "highcharts-angular";
import { ComponentsModule } from "../../components/components.module";
import { MathjaxModule } from "../mathjax/mathjax.module";
import { CalculateValuesComponent } from "./calculate-values.component";
import { CalculateValuesFormComponent } from "./components/calculate-values-form/calculate-values-form.component";

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
    declarations: [CalculateValuesComponent, CalculateValuesFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        FormsModule,
        HighchartsChartModule,
        MathjaxModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        ScrollingModule,
        MatTooltipModule,
        TranslateModule.forChild(),
        ComponentsModule,
        MatStepperModule,
        MatTableModule,
        MatCheckboxModule,
        SatPopoverModule,
        MatCardModule,
    ],
})
export class CalculateValuesModule {}
