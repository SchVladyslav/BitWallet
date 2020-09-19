import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
        return of(true);
    } else {
      this.router.navigate(['/login'], {
				queryParams: {
					'accessDenied': true
				}
			});
			return of(false);
		}
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }

}