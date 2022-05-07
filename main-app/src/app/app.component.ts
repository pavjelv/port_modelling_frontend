import { isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { FederationPluginService } from "./microfrontends/federation-plugin.service";
import { FederationPlugin } from "./model/microfrontends/microfrontend.model";
import { RxUnsubscribe } from "./utils/rx-unsubscribe";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends RxUnsubscribe implements OnInit {
    routes$: Observable<readonly FederationPlugin[]>;
    title = "port-modelling-fe";
    private isBrowser = false;

    constructor(private federationPluginService: FederationPluginService, @Inject(PLATFORM_ID) private platformId: unknown, private translate: TranslateService) {
        super();
        this.isBrowser = isPlatformBrowser(this.platformId);
        translate.setDefaultLang("ru-RU");
        translate.use("ru-RU");
    }

    ngOnInit(): void {
        if (this.isBrowser) {
            this.routes$ = this.federationPluginService.loadRoutesConfig().pipe(shareReplay({ refCount: false, bufferSize: 1 }));
        }
    }
}
