import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private token: string = null;

	constructor(private http: HttpClient) {

	}

	login(user: User): Observable<{ token: string }> {
		return this.http.post<{ token: string }>('/api/auth/login', user)
			.pipe(
				tap(
					({ token }) => {
						localStorage.setItem('auth-token', token);
						this.setToken(token);
						localStorage.setItem('walletID', user.wallet)
					}
				)
			);
	}

	signup(user: User): Observable<User> {
		return this.http.post<User>('/api/auth/signup', user)
			.pipe(
				tap(
					(user) => {
						localStorage.setItem('walletID', user.wallet);
					}
				)
			);
	}

	setToken(token: string): void {
		this.token = token;
	}

	getWalletID(): string {
		return localStorage.getItem('walletID');
	}

	getToken(): string {
		return this.token;
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	logout() {
		this.setToken(null);
		localStorage.removeItem('auth-token');
	}
}