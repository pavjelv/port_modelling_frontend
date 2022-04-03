import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { FederationPlugin } from "./model/microfrontends/microfrontend.model";
import { FederationPluginService } from "./microfrontends/federation-plugin.service";
import { shareReplay } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["app.component.less"],
})
export class AppComponent implements OnInit {
    routes$: Observable<ReadonlyArray<FederationPlugin>>;
    title = "port-modelling-fe";
    private isBrowser = false;

    constructor(private federationPluginService: FederationPluginService,
                @Inject(PLATFORM_ID) private platformId: unknown,
                private translate: TranslateService
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        translate.setDefaultLang("ru-RU");
        translate.use("ru-RU");
    }

    ngOnInit(): void {
        if (this.isBrowser) {
            this.routes$ = this.federationPluginService.loadRoutesConfig().pipe(shareReplay(1));
            this.routes$.subscribe((v) => console.log(v));
        }
    }
}
