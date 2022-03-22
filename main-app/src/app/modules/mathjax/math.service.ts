import {
    ReplaySubject,
    Observable,
    Observer,
    Subject,
} from "rxjs";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class MathService {
    private readonly notifier: ReplaySubject<boolean>;
    private readonly _renderNotifier: Subject<number> = new ReplaySubject(50, 10000);
    private mathContentCache: Map<string, string> = new Map<string, string>();

    constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
        this.notifier = new ReplaySubject<boolean>();
        const isBrowser = isPlatformBrowser(this.platformId);
        if (isBrowser) {
            console.log("INIT HUB READY");
            (window as unknown as { hubReady: Observer<any> }).hubReady = this.notifier;
        }
    }

    ready(): Observable<boolean> {
        return this.notifier;
    }

    get renderNotifier(): Observable<number> {
        return this._renderNotifier.asObservable();
    }

    render(element: HTMLElement, mathContent?: string): void {
        if (mathContent) {
            if (this.mathContentCache.has(mathContent)) {
                element.innerHTML = this.mathContentCache.get(mathContent);
                return;
            }
            this._renderNotifier.next(1);
            element.innerText = mathContent;
        } else {
            console.error(this, "Math content undefined: ", mathContent);
        }

        MathJax?.Hub.Queue(["Typeset", MathJax.Hub, element]);
        MathJax?.Hub.Queue(() => {
            this.mathContentCache.set(mathContent, element.innerHTML);
            this._renderNotifier.next(-1);
        });
    }
}
