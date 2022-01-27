import { NgModule } from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
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
    data: { state: "lazy" },
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
