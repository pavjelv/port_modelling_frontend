import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplesPageComponent } from "./examples-page/examples-page.component";
import { TranslateModule } from "@ngx-translate/core";
import {
    RouterModule,
    Routes,
} from "@angular/router";
import { MatTreeModule } from "@angular/material/tree";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HighchartViewComponent } from "./highchart-view/highchart-view.component";
import { ComponentsModule } from "../../components/components.module";
import { ChooseExampleViewComponent } from "./choose-example-view/choose-example-view.component";

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
            }
        ]
    },
];

@NgModule({
  declarations: [
      ExamplesPageComponent,
      HighchartViewComponent,
      ChooseExampleViewComponent
  ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes),
        MatTreeModule,
        MatButtonModule,
        MatIconModule,
        ComponentsModule,
    ],
})
export class ExamplesPageModule { }
