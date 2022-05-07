/**
 * Provides destroy$ observable for subclasses to use .takeUntil(this.destroy$)
 * Avoids having to keep up with so many subscriptions
 */
import { Directive, OnDestroy } from "@angular/core";

import { Subject } from "rxjs";

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class RxUnsubscribe implements OnDestroy {
    private _destroy$: Subject<void> = new Subject();
    destroy$ = this._destroy$.asObservable();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
