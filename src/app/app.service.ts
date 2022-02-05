import {BehaviorSubject, Observable} from "rxjs";
import {FederationPlugin} from "./model/microfrontends/microfrontend.model";

export class AppService {
  private static routesSubject: BehaviorSubject<ReadonlyArray<FederationPlugin>> = new BehaviorSubject([]);
  private static routes$: Observable<ReadonlyArray<FederationPlugin>> = AppService.routesSubject;

  public static setRoutes(routes: ReadonlyArray<FederationPlugin>): void {
    AppService.routesSubject.next(routes);
  }

  public static getRoutes(): Observable<ReadonlyArray<FederationPlugin>> {
    return AppService.routes$;
  }
}
