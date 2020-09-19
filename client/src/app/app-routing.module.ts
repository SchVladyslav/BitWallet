import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LogInComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout/site-layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'welcome', component: LandingPageComponent },
  { path: '', component: AuthLayoutComponent, children: [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'login', component: LogInComponent },
    { path: 'signup', component: SignUpComponent },
  ] },
  { path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
