import {Routes} from "@angular/router";
import { environment } from "@env/environment";

export const APPLICATION_ROUTES: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./modules/homepage/homepage.module").then(
        (m) => m.HomepageModule
      ),
    data: { state: "lazy" },
  },
  {
    path: "system-example",
    loadChildren: () =>
      import("./modules/system-example/system-example.module").then(
        (m) => m.SystemExampleModule
      ),
    data: { state: "lazy" },
  },
  {
    path: "modelling-view",
    loadChildren: () =>
      import("./modules/modelling-view/modelling-view.module").then(
        (m) => m.ModellingViewModule
      ),
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
    loadChildren: () =>
      import("./modules/calculate-values/calculate-values.module").then(
        (m) => m.CalculateValuesModule
      ),
    data: { state: "lazy" },
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
];