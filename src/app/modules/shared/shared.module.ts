import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonHeaderComponent } from "./header/common-header.component";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [
    CommonHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatMenuModule,
  ],
  exports: [
    CommonHeaderComponent,
  ],
})
export class SharedModule {}
