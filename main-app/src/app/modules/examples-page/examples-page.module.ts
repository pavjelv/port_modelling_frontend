import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTreeModule } from "@angular/material/tree";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { ChooseExampleViewComponent } from "./choose-example-view/choose-example-view.component";
import { ExamplesPageComponent } from "./examples-page/examples-page.component";
import { HighchartViewComponent } from "./highchart-view/highchart-view.component";

const routes: Routes = [
    {
        path: "",
        component: ExamplesPageComponent,
        children: [
            {
                path: "",
                component: ChooseExampleViewComponent,
            },
            {
                path: "**",
                component: HighchartViewComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [ExamplesPageComponent, HighchartViewComponent, ChooseExampleViewComponent],
    imports: [CommonModule, TranslateModule.forChild(), RouterModule.forChild(routes), MatTreeModule, MatButtonModule, MatIconModule, ComponentsModule],
})
export class ExamplesPageModule {}
