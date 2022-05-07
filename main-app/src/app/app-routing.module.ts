import { NgModule } from "@angular/core";
import { RouteReuseStrategy, RouterModule } from "@angular/router";
import { AppPreloadingStrategy } from "./app-preloading.strategy";
import { APPLICATION_ROUTES } from "./application-routes.const";
import { AppRouteReuseStrategy } from "./route-reuse-strategy";

@NgModule({
    imports: [
        RouterModule.forRoot(APPLICATION_ROUTES, {
            anchorScrolling: "enabled",
            preloadingStrategy: AppPreloadingStrategy,
        }),
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useValue: new AppRouteReuseStrategy(),
        },
        AppPreloadingStrategy,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
