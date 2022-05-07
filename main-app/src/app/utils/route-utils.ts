import { Type } from "@angular/core";
import { Routes } from "@angular/router";
import { APPLICATION_ROUTES } from "../application-routes.const";
import { FederationPlugin } from "../model/microfrontends/microfrontend.model";
import { loadRemoteModule } from "./federation-utils";

export function buildRoutes(options: readonly FederationPlugin[]): Routes {
    const lazyRoutes: Routes = options?.map((mfe: FederationPlugin) => {
        switch (mfe.type) {
            case "angular": {
                switch (mfe.subType) {
                    case "routeModule": {
                        return {
                            path: mfe.routePath,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
                            loadChildren: (): Promise<Type<unknown>> => loadRemoteModule(mfe).then((m) => m[mfe.moduleClassName]),
                        };
                    }
                    default: {
                        return {
                            path: mfe.routePath,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
                            loadChildren: (): Promise<Type<unknown>> => loadRemoteModule(mfe).then((m) => m[mfe.moduleClassName]),
                        };
                    }
                }
            }
            case "react": {
                return {
                    path: mfe.routePath,
                    children: [
                        {
                            path: "**",
                            loadChildren: (): Promise<Type<unknown>> =>
                                import("../modules/react-wrapper/react-wrapper.module").then((m) => {
                                    return m.ReactWrapperModule;
                                }),
                            data: { configuration: mfe },
                        },
                    ],
                };
            }
            default: {
                return {
                    path: mfe.routePath,
                    children: [
                        {
                            path: "**",
                            component: null,
                            data: { configuration: mfe },
                        },
                    ],
                };
            }
        }
    });

    return [...(lazyRoutes || []), ...APPLICATION_ROUTES];
}
