import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { scan } from "rxjs/operators";
import { MathService } from "./modules/mathjax/math.service";

@Injectable({
    providedIn: "any",
})
export class MathContentRouterGuard implements CanDeactivate<unknown> {
    private renderFinished = true;
    constructor(private mathService: MathService, private snackBar: MatSnackBar) {
        this.mathService.renderNotifier.pipe(scan((acc, curr) => acc + curr, 0)).subscribe((v) => {
            this.renderFinished = v <= 0;
        });
    }
    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot,
    ): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
        if (!this.renderFinished) {
            this.snackBar.open("Please wait until all content is rendered!", null, {
                duration: 3000,
                horizontalPosition: "right",
                verticalPosition: "top",
            });
        }
        return this.renderFinished;
    }
}
