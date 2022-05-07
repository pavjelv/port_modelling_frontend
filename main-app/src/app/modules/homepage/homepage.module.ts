import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { HomepageComponent } from "./homepage.component";

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
