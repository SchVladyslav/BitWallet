import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private router: Router) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.authService.isAuthenticated()) {
			req = req.clone({
				setHeaders: {
					Authorization: this.authService.getToken()
				}
			});
		}

		return next.handle(req).pipe(
			catchError(
				(error: HttpErrorResponse) => this.handleAuthError(error)
			)
		);
	}

	private handleAuthError(error: HttpErrorResponse): Observable<any> {
		if (error.status === 401) {
			this.router.navigate(['/login'], {
				queryParams: {
					sessionExpired: true
				}
			});
		}

		return throwError(error);
	}
}
