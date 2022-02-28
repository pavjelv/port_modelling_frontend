import { Observer, ReplaySubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

declare global {
    interface Window {
        hubReady: Observer<boolean>;
    }
}

@Injectable()
export class MathService {
    private readonly notifier: ReplaySubject<boolean>;

    constructor() {
        this.notifier = new ReplaySubject<boolean>();
        window.hubReady = this.notifier;
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
