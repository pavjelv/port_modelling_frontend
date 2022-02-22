import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./modules/shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FederationPluginService} from "./microfrontends/federation-plugin.service";
import {ReactWrapperModule} from "./modules/react-wrapper/react-wrapper.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    ReactWrapperModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [FederationPluginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
