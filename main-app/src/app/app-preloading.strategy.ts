import {
    PreloadAllModules,
    Route,
} from "@angular/router";
import {Observable, timer} from "rxjs";
import {switchMap} from "rxjs/operators";
import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class AppPreloadingStrategy extends PreloadAllModules {
    private isBrowser;
    constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
        super();
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (!this.isBrowser) {
            return super.preload(route, load);
        }
        return timer(3000).pipe(switchMap(() => load()));
    }
}
