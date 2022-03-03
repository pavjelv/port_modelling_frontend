import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {APPLICATION_ROUTES} from "./application-routes.const";

@NgModule({
  imports: [
    RouterModule.forRoot(APPLICATION_ROUTES, { anchorScrolling: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
