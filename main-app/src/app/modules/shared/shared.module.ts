import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { CommonHeaderComponent } from "./header/common-header.component";

@NgModule({
    declarations: [CommonHeaderComponent],
    imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule, MatIconModule, MatBadgeModule, MatMenuModule, TranslateModule.forChild()],
    exports: [CommonHeaderComponent],
})
export class SharedModule {}
