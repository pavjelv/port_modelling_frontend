import { NgModule } from "@angular/core";
import {ServerModule, ServerTransferStateModule} from "@angular/platform-server";

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import {TransferState} from "@angular/platform-browser";
import {translateServerLoaderFactory} from "./i18n/loaders/translate-server.loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
