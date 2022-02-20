import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SystemAnimationComponent} from "./system-animation/system-animation.component";
import {MatSliderModule} from "@angular/material/slider";
import { EmptyViewComponent } from "./empty-view/empty-view.component";
import {CommonReactWrapperComponent} from "./common-react-wrapper/common-react-wrapper.component";



@NgModule({
    declarations: [SystemAnimationComponent, EmptyViewComponent, CommonReactWrapperComponent],
    exports: [
        SystemAnimationComponent,
        CommonReactWrapperComponent,
    ],
    imports: [
        CommonModule,
        MatSliderModule
    ]
})
export class ComponentsModule { }
