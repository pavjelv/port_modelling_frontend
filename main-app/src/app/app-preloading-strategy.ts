import {PreloadingStrategy, Route} from "@angular/router";
import {Observable, timer} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class AppPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return timer(3000).pipe(switchMap(() => load()));
  }
}
