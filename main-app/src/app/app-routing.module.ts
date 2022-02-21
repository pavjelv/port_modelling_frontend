import { NgModule } from "@angular/core";
import {PreloadAllModules, RouterModule} from "@angular/router";
import {APPLICATION_ROUTES} from "./application-routes.const";

@NgModule({
  imports: [
    RouterModule.forRoot(APPLICATION_ROUTES, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
