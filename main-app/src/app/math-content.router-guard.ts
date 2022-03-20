import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MathService } from "./modules/mathjax/math.service";
import { scan } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class MathContentRouterGuard implements CanDeactivate<any> {
    private renderFinished = true;
    constructor(private mathService: MathService, private snackBar: MatSnackBar) {
        this.mathService.renderNotifier
            .pipe(
                scan((acc, curr) => acc + curr, 0),
            )
            .subscribe((v) => {
                this.renderFinished = v <= 0;
                console.log(this.renderFinished, v);
            });
    }
    canDeactivate(
        component: any,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
