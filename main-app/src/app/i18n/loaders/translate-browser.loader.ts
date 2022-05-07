import { HttpClient } from "@angular/common/http";
import { makeStateKey, StateKey, TransferState } from "@angular/platform-browser";
import { TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Observable } from "rxjs";

export class TranslateBrowserLoader implements TranslateLoader {
    constructor(private http: HttpClient, private transferState: TransferState) {}

    public getTranslation(lang: string): Observable<any> {
        const key: StateKey<number> = makeStateKey<number>("transfer-translate-" + lang);
        const data = this.transferState.get(key, null);

        // First we are looking for the translations in transfer-state,
        // if none found, http load as fallback
        if (data) {
            return new Observable((observer) => {
                observer.next(data);
                observer.complete();
            });
        }
        return new TranslateHttpLoader(this.http).getTranslation(lang);
    }
}

export function translateBrowserLoaderFactory(httpClient: HttpClient, transferState: TransferState): TranslateLoader {
    return new TranslateBrowserLoader(httpClient, transferState);
}
