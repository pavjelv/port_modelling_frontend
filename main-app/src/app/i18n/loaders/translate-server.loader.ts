import * as fs from "fs";
// eslint-disable-next-line unicorn/import-style
import { join } from "path";
import { makeStateKey, StateKey, TransferState } from "@angular/platform-browser";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";

export class TranslateServerLoader implements TranslateLoader {
    constructor(private transferState: TransferState, private prefix: string = "i18n", private suffix: string = ".json") {}

    public getTranslation(lang: string): Observable<unknown> {
        return new Observable((observer) => {
            const assetsFolder = join(process.cwd(), "dist", "port-modelling-fe", "browser", "assets", this.prefix);

            const jsonData = JSON.parse(fs.readFileSync(`${assetsFolder}/${lang}${this.suffix}`, "utf8"));

            // Here we save the translations in the transfer-state
            const key: StateKey<number> = makeStateKey<number>("transfer-translate-" + lang);
            this.transferState.set(key, jsonData);

            observer.next(jsonData);
            observer.complete();
        });
    }
}

export function translateServerLoaderFactory(transferState: TransferState): TranslateLoader {
    return new TranslateServerLoader(transferState);
}
