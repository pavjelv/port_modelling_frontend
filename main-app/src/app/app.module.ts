import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LocalizationModule } from "./i18n/localization.module";
import { FederationPluginService } from "./microfrontends/federation-plugin.service";
import { MathjaxModule } from "./modules/mathjax/mathjax.module";
import { ReactWrapperModule } from "./modules/react-wrapper/react-wrapper.module";
import { SharedModule } from "./modules/shared/shared.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: "serverApp" }),
        AppRoutingModule,
        ReactWrapperModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        TransferHttpCacheModule,
        LocalizationModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MathjaxModule.forRoot(),
    ],
    providers: [FederationPluginService],
    bootstrap: [AppComponent],
})
export class AppModule {}
