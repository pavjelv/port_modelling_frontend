import { Injectable } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { Observable, of } from "rxjs";
import { shareReplay, switchMap, tap } from "rxjs/operators";
import { buildRoutes } from "../utils/route-utils";
import { loadRemoteEntry } from "../utils/federation-utils";
import { ROUTES_CONFIGURATION } from "./sample-configuration";
import { AppService } from "../app.service";
import { FederationPlugin } from "../model/microfrontends/microfrontend.model";

@Injectable()
export class FederationPluginService {
    private static readonly ROUTES_CONFIGURATION = "routes_configuration";

    constructor(private router: Router) {}

    private static loadConfiguration(): Observable<ReadonlyArray<FederationPlugin>> {
        // just a sample, need to load this configuration from backend
        return of(ROUTES_CONFIGURATION);
    }

    loadRoutesConfig(): Observable<ReadonlyArray<FederationPlugin>> {
        return of(window.sessionStorage.getItem(FederationPluginService.ROUTES_CONFIGURATION)).pipe(
            switchMap((routesConfigurationItem: string) => {
                if (routesConfigurationItem) {
                    const routesConfiguration: ReadonlyArray<FederationPlugin> = JSON.parse(routesConfigurationItem);
                    return of(routesConfiguration);
                }
                return FederationPluginService.loadConfiguration().pipe(
                    tap((routes: ReadonlyArray<FederationPlugin>) => {
                        window.sessionStorage.setItem(FederationPluginService.ROUTES_CONFIGURATION, JSON.stringify(routes));
                    }),
                );
            }),
            tap((routes: ReadonlyArray<FederationPlugin>) => {
                const appRoutes: Routes = buildRoutes(routes);
                this.router.resetConfig(appRoutes);
                AppService.setRoutes(routes);
                this.loadRemoteContainersByRoutes(routes);
            }),
            shareReplay(1),
        );
    }

    private async loadRemoteContainersByRoutes(routes: ReadonlyArray<FederationPlugin>): Promise<boolean[]> {
        return Promise.all(
            routes.map((route: FederationPlugin) => {
                return loadRemoteEntry(route.remoteEntry);
            }),
        );
    }
}
