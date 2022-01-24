import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SystemAnimationComponent} from "./system-animation/system-animation.component";
import {MatSliderModule} from "@angular/material/slider";



@NgModule({
  declarations: [SystemAnimationComponent],
  imports: [
    CommonModule,
    MatSliderModule
  ]
})
export class ComponentsModule { }
