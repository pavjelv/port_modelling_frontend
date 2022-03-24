import { Directive, OnInit, OnChanges, OnDestroy, Input, ElementRef } from "@angular/core";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { MathService } from "./math.service";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: "[mathContent]",
})
export class MathContentDirective implements OnInit, OnChanges, OnDestroy {
    private alive$ = new Subject<boolean>();

    @Input()
    private mathContent: string;
    private readonly _el: HTMLElement;

    constructor(private service: MathService, private el: ElementRef) {
        this._el = el.nativeElement as HTMLElement;
    }

    ngOnInit(): void {
        this.service
            .ready()
            .pipe(take(1), takeUntil(this.alive$))
            .subscribe(() => {
                this.service.render(this._el, this.mathContent);
            });
    }

    ngOnChanges(): void {
        this.service.render(this._el, this.mathContent);
    }

    ngOnDestroy(): void {
        this.alive$.next(false);
    }
}
