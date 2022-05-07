import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { MathContentRouterGuard } from "../../math-content.router-guard";
import { MathjaxModule } from "../mathjax/mathjax.module";
import { SystemExampleComponent } from "./system-example.component";

const routes: Routes = [
    {
        path: "",
        component: SystemExampleComponent,
        canDeactivate: [MathContentRouterGuard],
        data: {
            reusable: true,
        },
    },
];

@NgModule({
    declarations: [SystemExampleComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatTabsModule,
        MatStepperModule,
        TranslateModule.forChild(),
        ComponentsModule,
        MathjaxModule,
        MatSnackBarModule,
        MatButtonModule,
    ],
    providers: [MathContentRouterGuard],
    exports: [RouterModule, SystemExampleComponent],
})
export class SystemExampleModule {}
