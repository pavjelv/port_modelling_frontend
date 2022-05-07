import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, Observer, ReplaySubject, Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MathService {
    private readonly notifier: ReplaySubject<boolean>;
    private readonly _renderNotifier: Subject<number> = new ReplaySubject(50, 10000);
    private mathContentCache: Map<string, string> = new Map<string, string>();
    private initCalled = false;
    private isBrowser = false;

    constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
        // eslint-disable-next-line rxjs/no-ignored-replay-buffer
        this.notifier = new ReplaySubject<boolean>();
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            console.log("INIT HUB READY");
            ((window as unknown) as { hubReady: Observer<any> }).hubReady = this.notifier;
            this.preloadMathContent();
        }
    }

    private preloadMathContent(): void {
        const mathContentHolder: HTMLIFrameElement = document.createElement("iframe");
        mathContentHolder.addEventListener("load", () => {
            const preloadNodes: NodeList = mathContentHolder.contentDocument?.querySelectorAll("[data-math-hidden-content]");
            preloadNodes?.forEach((node) => {
                const element: Element = node as Element;
                this.mathContentCache.set(element.getAttribute("data-math-hidden-content"), element.innerHTML);
            });
        });
        mathContentHolder.src = "/assets/math-content-holder.html";
        mathContentHolder.setAttribute("importance", "low");
        mathContentHolder.style.display = "none";
        document.body.appendChild(mathContentHolder);
    }

    ready(): Observable<boolean> {
        return this.notifier.asObservable();
    }

    get renderNotifier(): Observable<number> {
        return this._renderNotifier.asObservable();
    }

    render(element: HTMLElement, mathContent?: string): void {
        if (!this.isBrowser) {
            return;
        }
        if (!this.initCalled) {
            element.innerText = mathContent;
            MathJax?.Hub.Queue(["Typeset", MathJax.Hub, element]);
            this.initCalled = true;
            return;
        }
        if (mathContent) {
            if (this.mathContentCache.has(mathContent)) {
                element.innerHTML = this.mathContentCache.get(mathContent);
                return;
            }
            this._renderNotifier.next(1);
            element.style.visibility = "hidden";
            element.innerText = mathContent;
        } else {
            console.error(this, "Math content undefined: ", mathContent);
        }

        MathJax?.Hub.Queue(["Typeset", MathJax.Hub, element]);
        MathJax?.Hub.Queue(() => {
            this.mathContentCache.set(mathContent, element.innerHTML);
            element.style.visibility = "visible";
            this._renderNotifier.next(-1);
        });
    }
}
