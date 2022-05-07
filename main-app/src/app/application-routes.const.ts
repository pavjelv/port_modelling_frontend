import { Type } from "@angular/core";
import { Routes } from "@angular/router";
import { environment } from "@env/environment";

export const APPLICATION_ROUTES: Routes = [
    {
        path: "system-example",
        loadChildren: (): Promise<Type<unknown>> => import("./modules/system-example/system-example.module").then((m) => m.SystemExampleModule),
        data: { state: "lazy" },
    },
    {
        path: "modelling-view",
        loadChildren: (): Promise<Type<unknown>> => import("./modules/modelling-view/modelling-view.module").then((m) => m.ModellingViewModule),
        data: {
            configuration: {
                remoteEntry: environment["port-animation-react-remote-entry"],
                remoteName: "react_app",
                exposedModule: "ReactApp",
                moduleClassName: "MainApplicationPlugin",
                routePath: "modelling-view",
            },
            state: "lazy",
        },
    },
    {
        path: "calculate",
        loadChildren: (): Promise<Type<unknown>> => import("./modules/calculate-values/calculate-values.module").then((m) => m.CalculateValuesModule),
        data: { state: "lazy" },
    },
    {
        path: "examples",
        loadChildren: (): Promise<Type<unknown>> => import("./modules/examples-page/examples-page.module").then((m) => m.ExamplesPageModule),
        data: { state: "lazy" },
    },
    {
        path: "",
        loadChildren: (): Promise<Type<unknown>> => import("./modules/homepage/homepage.module").then((m) => m.HomepageModule),
        data: { state: "lazy" },
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
    },
];
