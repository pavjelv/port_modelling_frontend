import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {APPLICATION_ROUTES} from "./application-routes.const";
import {AppPreloadingStrategy} from "./app-preloading-strategy";

@NgModule({
  imports: [
    RouterModule.forRoot(APPLICATION_ROUTES, {
      preloadingStrategy: AppPreloadingStrategy,
    }),
  ],
  providers: [AppPreloadingStrategy],
  exports: [RouterModule],
})
export class AppRoutingModule {}
