import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {SystemExampleComponent} from "./system-example.component";
import {MatTableModule} from "@angular/material/table";
import {FlexModule} from "@angular/flex-layout";
import {MatTabsModule} from "@angular/material/tabs";
import {ChartsModule} from "ng2-charts";

const routes: Routes = [
  {
    path: "",
    component: SystemExampleComponent,
  },
];

@NgModule({
  declarations: [SystemExampleComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatTableModule, FlexModule, MatTabsModule, ChartsModule],
  exports: [RouterModule, SystemExampleComponent],
})
export class SystemExampleModule {}
