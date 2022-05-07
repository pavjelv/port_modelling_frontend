import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatTableModule } from "@angular/material/table";
import { TranslateModule } from "@ngx-translate/core";
import { HighchartsChartModule } from "highcharts-angular";
import { MathjaxModule } from "../modules/mathjax/mathjax.module";
import { CommonReactWrapperComponent } from "./common-react-wrapper/common-react-wrapper.component";
import { HighchartWrapperComponent } from "./highchart-wrapper/highchart-wrapper.component";
import { KendallNotationComponent } from "./kendall-notation/kendall-notation.component";
import { MMCCSystemComponent } from "./m-m-c-c-system/m-m-c-c-system.component";
import { MMCKSystemComponent } from "./m-m-c-k-system/m-m-c-k-system.component";
import { MMCSystemComponent } from "./m-m-c-system/m-m-c-system.component";
import { SymbolsDescriptionComponent } from "./symbols-description/symbols-description.component";
import { SystemAnimationComponent } from "./system-animation/system-animation.component";

@NgModule({
    declarations: [
        SystemAnimationComponent,
        CommonReactWrapperComponent,
        KendallNotationComponent,
        MMCSystemComponent,
        MMCCSystemComponent,
        MMCKSystemComponent,
        SymbolsDescriptionComponent,
        HighchartWrapperComponent,
    ],
    exports: [
        SystemAnimationComponent,
        CommonReactWrapperComponent,
        KendallNotationComponent,
        MMCSystemComponent,
        MMCCSystemComponent,
        MMCKSystemComponent,
        SymbolsDescriptionComponent,
        HighchartWrapperComponent,
    ],
    imports: [
        CommonModule,
        MatSliderModule,
        TranslateModule.forChild(),
        MatCardModule,
        MatListModule,
        MatExpansionModule,
        MatTableModule,
        MathjaxModule,
        MatDialogModule,
        MatButtonModule,
        HighchartsChartModule,
    ],
})
export class ComponentsModule {}
