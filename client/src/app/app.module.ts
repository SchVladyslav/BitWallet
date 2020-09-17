import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LogInComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SendModalComponent } from './components/modal/send-modal/send-modal.component';
import { SelectCurrencyComponent } from './shared/select-currency/select-currency.component';
import { RequestModalComponent } from './components/modal/request-modal/request-modal.component';
import { SettingsDropdownComponent } from './shared/dropdown/settings-dropdown/settings-dropdown.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout/site-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LogInComponent,
    SignUpComponent,
    DashboardComponent,
    SendModalComponent,
    SelectCurrencyComponent,
    RequestModalComponent,
    SettingsDropdownComponent,
    AuthLayoutComponent,
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    SendModalComponent,
    RequestModalComponent,
    SettingsDropdownComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
