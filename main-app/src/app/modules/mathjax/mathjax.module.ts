import {NgModule, ModuleWithProviders, Inject, PLATFORM_ID} from "@angular/core";
import { MathContentDirective } from "./math-content.directive";
import { MathService } from "./math.service";
import {isPlatformBrowser} from "@angular/common";

@NgModule({
    declarations: [MathContentDirective],
    exports: [MathContentDirective]
})
export class MathjaxModule {
    constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
      const isBrowser = isPlatformBrowser(this.platformId);
      if (isBrowser) {
        const script = document.createElement("script") as HTMLScriptElement;
        script.type = "text/javascript";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";
        script.async = true;

        document.getElementsByTagName("head")[0].appendChild(script);

        const config = document.createElement("script") as HTMLScriptElement;
        config.type = "text/x-mathjax-config";
        config.text = `
            MathJax.Hub.Config({
                skipStartupTypeset: true,
                tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] }
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
            providers: [{ provide: MathService, useClass: MathService }]
        };
    }
}
