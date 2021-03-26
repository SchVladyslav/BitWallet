import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LogInComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout/site-layout.component';
import { CurrencyLayoutComponent } from './shared/layouts/currency-layout/currency-layout.component';
import { AuthGuard } from './auth.guard';
import { PreferencesComponent } from './components/preferences/preferences.component';

const routes: Routes = [
  { path: 'welcome', component: LandingPageComponent },
  { path: '', component: AuthLayoutComponent, children: [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'login', component: LogInComponent },
    { path: 'signup', component: SignUpComponent },
  ] },
  { path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'btc', component: CurrencyLayoutComponent },
    { path: 'eth', component: CurrencyLayoutComponent },
    { path: 'xrp', component: CurrencyLayoutComponent },
    { path: 'preferences', component: PreferencesComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
