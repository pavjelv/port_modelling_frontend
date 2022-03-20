import { NgModule } from "@angular/core";
import { PreloadAllModules, RouteReuseStrategy, RouterModule } from "@angular/router";
import { APPLICATION_ROUTES } from "./application-routes.const";
import { AppRouteReuseStrategy } from "./route-reuse-strategy";

@NgModule({
    imports: [
        RouterModule.forRoot(APPLICATION_ROUTES, {
            anchorScrolling: "enabled",
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useValue: new AppRouteReuseStrategy(),
        },
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
