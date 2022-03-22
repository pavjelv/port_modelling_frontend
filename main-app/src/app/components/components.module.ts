import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SystemAnimationComponent } from "./system-animation/system-animation.component";
import { MatSliderModule } from "@angular/material/slider";
import { EmptyViewComponent } from "./empty-view/empty-view.component";
import { CommonReactWrapperComponent } from "./common-react-wrapper/common-react-wrapper.component";
import { KendallNotationComponent } from "./kendall-notation/kendall-notation.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MMCSystemComponent } from "./m-m-c-system/m-m-c-system.component";
import { MathjaxModule } from "../modules/mathjax/mathjax.module";
import { MMCCSystemComponent } from "./m-m-c-c-system/m-m-c-c-system.component";
import { MMCKSystemComponent } from "./m-m-c-k-system/m-m-c-k-system.component";
import { SymbolsDescriptionComponent } from "./symbols-description/symbols-description.component";

@NgModule({
    declarations: [
        SystemAnimationComponent,
        EmptyViewComponent,
        CommonReactWrapperComponent,
        KendallNotationComponent,
        MMCSystemComponent,
        MMCCSystemComponent,
        MMCKSystemComponent,
        SymbolsDescriptionComponent,
    ],
    exports: [
        SystemAnimationComponent,
        CommonReactWrapperComponent,
        KendallNotationComponent,
        MMCSystemComponent,
        MMCCSystemComponent,
        MMCKSystemComponent,
        SymbolsDescriptionComponent
    ],
    imports: [
        CommonModule,
        MatSliderModule,
        TranslateModule.forChild(),
        MatCardModule,
        MatListModule,
        MatExpansionModule,
        MatTableModule,
        MathjaxModule
    ],
})
export class ComponentsModule {}
