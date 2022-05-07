import { NgModule } from "@angular/core";
import { TransferState } from "@angular/platform-browser";
import { ServerModule, ServerTransferStateModule } from "@angular/platform-server";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { translateServerLoaderFactory } from "./i18n/loaders/translate-server.loader";

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ServerTransferStateModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateServerLoaderFactory,
                deps: [TransferState],
            },
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
