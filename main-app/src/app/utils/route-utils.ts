import { loadRemoteModule } from "./federation-utils";
import { Routes } from "@angular/router";
import { FederationPlugin } from "../model/microfrontends/microfrontend.model";
import { APPLICATION_ROUTES } from "../application-routes.const";

export function buildRoutes(options: ReadonlyArray<FederationPlugin>): Routes {
    const lazyRoutes: Routes = options?.map((mfe: FederationPlugin) => {
        switch (mfe.type) {
            case "angular": {
                switch (mfe.subType) {
                    case "routeModule": {
                        return {
                            path: mfe.routePath,
                            loadChildren: () => loadRemoteModule(mfe).then((m) => m[mfe.moduleClassName]),
                        };
                    }
                    default: {
                        return {
                            path: mfe.routePath,
                            loadChildren: () => loadRemoteModule(mfe).then((m) => m[mfe.moduleClassName]),
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
                            loadChildren: () =>
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
