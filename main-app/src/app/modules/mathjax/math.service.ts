import { ReplaySubject, Observable, Observer } from "rxjs";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class MathService {
    private readonly notifier: ReplaySubject<boolean>;

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

    render(element: HTMLElement, mathContent?: string): void {
        if (mathContent) {
            if (mathContent) {
                element.innerText = mathContent;
            } else {
                console.error("Invalid LaTeX string: ", mathContent);
            }
        } else {
            console.error(this, "Math content undefined: ", mathContent);
        }

        MathJax?.Hub.Queue(["Typeset", MathJax.Hub, element]);
    }
}
