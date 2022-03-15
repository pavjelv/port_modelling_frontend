import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomepageComponent } from "./homepage.component";
import { RouterModule, Routes } from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    component: HomepageComponent,
  },
];

@NgModule({
  declarations: [HomepageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatCardModule, TranslateModule.forChild()],
  exports: [RouterModule, HomepageComponent],
})
export class HomepageModule {}
