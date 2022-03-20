import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomepageComponent } from "./homepage.component";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogModule } from "@angular/material/dialog";

const routes: Routes = [
    {
        path: "",
        component: HomepageComponent,
        data: {
            reusable: true,
        },
    },
];

@NgModule({
    declarations: [HomepageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatDialogModule, MatCardModule, TranslateModule.forChild()],
    exports: [RouterModule, HomepageComponent],
})
export class HomepageModule {}
