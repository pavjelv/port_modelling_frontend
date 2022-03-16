import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SystemAnimationComponent} from "./system-animation/system-animation.component";
import {MatSliderModule} from "@angular/material/slider";
import { EmptyViewComponent } from "./empty-view/empty-view.component";
import {CommonReactWrapperComponent} from "./common-react-wrapper/common-react-wrapper.component";
import {KendallNotationComponent} from "./kendall-notation/kendall-notation.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";



@NgModule({
    declarations: [SystemAnimationComponent, EmptyViewComponent, CommonReactWrapperComponent, KendallNotationComponent],
    exports: [
        SystemAnimationComponent,
        CommonReactWrapperComponent,
        KendallNotationComponent,
    ],
    imports: [
        CommonModule,
        MatSliderModule,
        TranslateModule.forChild(),
        MatCardModule,
        MatListModule,
        MatExpansionModule,
        MatTableModule,
    ]
})
export class ComponentsModule { }
