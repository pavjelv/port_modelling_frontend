import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {translateBrowserLoaderFactory} from "./loaders/translate-browser.loader";
import {TransferState} from "@angular/platform-browser";
import {TransferHttpCacheModule} from "@nguniversal/common";

export function createTranslateLoader(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TransferHttpCacheModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateBrowserLoaderFactory),
        deps: [HttpClient, TransferState]
      },
      defaultLanguage: "ru-RU",
    }),
  ],
  exports: [TranslateModule]
})
export class LocalizationModule { }
