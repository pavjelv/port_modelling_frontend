import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactWrapperComponent } from "./components/react-wrapper/react-wrapper.component";
import { ReactWrapperRoutesRoutingModule } from "./react-wrapper.routes";

@NgModule({
    declarations: [ReactWrapperComponent],
    exports: [ReactWrapperComponent],
    imports: [CommonModule, ReactWrapperRoutesRoutingModule],
})
export class ReactWrapperModule {}
