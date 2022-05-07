import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { PreloadAllModules, Route } from "@angular/router";
import { Observable, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
    providedIn: "any",
})
export class AppPreloadingStrategy extends PreloadAllModules {
    private isBrowser;
    constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
        super();
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
        if (!this.isBrowser) {
            return super.preload(route, load);
        }
        return timer(3000).pipe(switchMap(() => load()));
    }
}
