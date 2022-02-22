import { Injectable } from "@angular/core";

import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

import { Subject } from "rxjs";
import { scan, map, distinctUntilChanged } from "rxjs/operators";
import { MatSpinner } from "@angular/material/progress-spinner";

@Injectable({
  providedIn: "root",
})
export class LoadingOverlayService {
  private spinnerTopRef: OverlayRef;

  private spin$: Subject<number> = new Subject();

  constructor(private overlay: Overlay) {
    this.spinnerTopRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: "port-modelling-backdrop",
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    this.spin$
      .asObservable()
      .pipe(
        scan((acc, next) => {
          if (!next) {
            return 0;
          }
          return acc + next >= 0 ? acc + next : 0;
        }, 0),
        map((val) => val > 0),
        distinctUntilChanged()
      )
      .subscribe((res) => {
        if (res) {
          this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
        } else if (this.spinnerTopRef.hasAttached()) {
          this.spinnerTopRef.detach();
        }
      });
  }
  showLoading(): void {
    this.spin$.next(1);
  }
  hideLoading(): void {
    this.spin$.next(-1);
  }
  reset(): void {
    this.spin$.next(0);
  }
}
