import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { LogoComponent } from './shared/logo/logo/logo.component';
import { SelectLangComponent } from './shared/select-lang/select-lang/select-lang.component';
import { LoginFormComponent } from './shared/forms/login-form/login-form.component';
import { SignupFormComponent } from './shared/forms/signup-form/signup-form.component';
import { Interceptor } from './interceptor/interceptor';
import { NotificationModalComponent } from './components/modal/notification-modal/notification-modal.component';
import { CurrencyLayoutComponent } from './shared/layouts/currency-layout/currency-layout.component';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockchainViewerComponent } from './components/blockchain-viewer/blockchain-viewer.component';
import { BlockViewComponent } from './components/block-view/block-view.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BalanceComponent } from './components/balance/balance.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { DiagramComponent } from './shared/diagram/diagram.component';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

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
    SiteLayoutComponent,
    LogoComponent,
    SelectLangComponent,
    LoginFormComponent,
    SignupFormComponent,
    NotificationModalComponent,
    CurrencyLayoutComponent,
    BlockchainViewerComponent,
    BlockViewComponent,
    PreferencesComponent,
    TransactionsComponent,
    BalanceComponent,
    DiagramComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ChartModule
  ],
  entryComponents: [
    SendModalComponent,
    RequestModalComponent,
    SettingsDropdownComponent,
    NotificationModalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: Interceptor
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } 
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
