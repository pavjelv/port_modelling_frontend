import { BehaviorSubject, Observable } from "rxjs";
import { FederationPlugin } from "./model/microfrontends/microfrontend.model";

export class AppService {
    private static routesSubject: BehaviorSubject<readonly FederationPlugin[]> = new BehaviorSubject([]);
    private static routes$: Observable<readonly FederationPlugin[]> = AppService.routesSubject;

    public static setRoutes(routes: readonly FederationPlugin[]): void {
        AppService.routesSubject.next(routes);
    }

    public static getRoutes(): Observable<readonly FederationPlugin[]> {
        return AppService.routes$;
    }
}
