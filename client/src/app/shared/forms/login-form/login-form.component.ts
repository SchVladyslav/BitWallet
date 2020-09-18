import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription; // responsible for memory leak
  walletID: string;

  constructor(
    private authService: AuthService, 
    private router: Router, // for redirect to dashboard
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.walletID = this.authService.getWalletID();

    this.form = new FormGroup({
      wallet: new FormControl(this.walletID, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]), // 1-st param - get from storage wallet id
      password: new FormControl(null, [Validators.required])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if (params['accessDenied']) {

      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    this.sub = this.authService.login(this.form.value)
    .subscribe(() => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
        this.form.enable();     
      }
    );
  }

}
