import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {SystemExampleComponent} from "./system-example.component";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";

const routes: Routes = [
  {
    path: "",
    component: SystemExampleComponent,
  },
];

@NgModule({
  declarations: [SystemExampleComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatTableModule, MatTabsModule],
  exports: [RouterModule, SystemExampleComponent],
})
export class SystemExampleModule {}
