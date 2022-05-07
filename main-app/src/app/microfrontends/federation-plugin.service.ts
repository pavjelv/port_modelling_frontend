import { Injectable } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { Observable, of } from "rxjs";
import { shareReplay, switchMap, tap } from "rxjs/operators";
import { AppService } from "../app.service";
import { FederationPlugin } from "../model/microfrontends/microfrontend.model";
import { loadRemoteEntry } from "../utils/federation-utils";
import { buildRoutes } from "../utils/route-utils";
import { ROUTES_CONFIGURATION } from "./sample-configuration";

@Injectable({
    providedIn: "any",
})
export class FederationPluginService {
    private static readonly ROUTES_CONFIGURATION = "routes_configuration";

    constructor(private router: Router) {}

    private static loadConfiguration(): Observable<readonly FederationPlugin[]> {
        // just a sample, need to load this configuration from backend
        return of(ROUTES_CONFIGURATION);
    }

    loadRoutesConfig(): Observable<readonly FederationPlugin[]> {
        return of(window.sessionStorage.getItem(FederationPluginService.ROUTES_CONFIGURATION)).pipe(
            switchMap((routesConfigurationItem: string) => {
                if (routesConfigurationItem) {
                    const routesConfiguration: readonly FederationPlugin[] = JSON.parse(routesConfigurationItem);
                    return of(routesConfiguration);
                }
                return FederationPluginService.loadConfiguration().pipe(
                    tap((routes: readonly FederationPlugin[]) => {
                        window.sessionStorage.setItem(FederationPluginService.ROUTES_CONFIGURATION, JSON.stringify(routes));
                    }),
                );
            }),
            tap((routes: readonly FederationPlugin[]) => {
                const appRoutes: Routes = buildRoutes(routes);
                this.router.resetConfig(appRoutes);
                AppService.setRoutes(routes);
                this.loadRemoteContainersByRoutes(routes).then();
            }),
            shareReplay({ bufferSize: 1, refCount: false }),
        );
    }

    private async loadRemoteContainersByRoutes(routes: readonly FederationPlugin[]): Promise<boolean[]> {
        return Promise.all(
            routes.map((route: FederationPlugin) => {
                return loadRemoteEntry(route.remoteEntry);
            }),
        );
    }
}
