import { isPlatformBrowser } from "@angular/common";
import { Inject, ModuleWithProviders, NgModule, PLATFORM_ID } from "@angular/core";
import { MathContentDirective } from "./math-content.directive";
import { MathService } from "./math.service";

@NgModule({
    declarations: [MathContentDirective],
    exports: [MathContentDirective],
})
export class MathjaxModule {
    constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
        const isBrowser = isPlatformBrowser(this.platformId);
        if (isBrowser) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const script = document.createElement("script")!;
            script.type = "text/javascript";
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";
            script.async = true;

            document.getElementsByTagName("head")[0].appendChild(script);

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const config = document.createElement("script")!;
            config.type = "text/x-mathjax-config";
            config.text = `
            MathJax.Hub.Config({
                skipStartupTypeset: true,
                tex2jax: { inlineMath: [["$", "$"], ["\\[", "\\]"]] }
            });
            MathJax.Hub.Register.StartupHook('End', () => {
                window.hubReady?.next();
                window.hubReady?.complete();
            });
        `;

            document.getElementsByTagName("head")[0].appendChild(config);
        }
    }

    public static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: MathjaxModule,
            providers: [{ provide: MathService, useClass: MathService }],
        };
    }
}
