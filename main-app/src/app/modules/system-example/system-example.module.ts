import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SystemExampleComponent } from "./system-example.component";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { MathjaxModule } from "../mathjax/mathjax.module";
import { MathContentRouterGuard } from "../../math-content.router-guard";
import { MatSnackBarModule } from "@angular/material/snack-bar";

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
    imports: [CommonModule, RouterModule.forChild(routes), MatTableModule, MatTabsModule, MatStepperModule, TranslateModule.forChild(), ComponentsModule, MathjaxModule, MatSnackBarModule],
    providers: [MathContentRouterGuard],
    exports: [RouterModule, SystemExampleComponent],
})
export class SystemExampleModule {}
