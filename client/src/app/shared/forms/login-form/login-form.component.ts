import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractPageDirective } from '../../abstract-page/abstract-page.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends AbstractPageDirective implements OnInit {

  form: FormGroup;
  walletID: string;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService, 
    private router: Router, // for redirect to dashboard
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.walletID = this.authService.getWalletID();

    this.form = new FormGroup({
      wallet: new FormControl(this.walletID, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]), // 1-st param - get from storage wallet id
      password: new FormControl(null, [Validators.required])
    });

    this.route.queryParams
    .pipe(takeUntil(this.destroy$))
    .subscribe((params: Params) => {
      if (params['registered']) {
        this.notificationService.show('You can login now.');
      } else if (params['accessDenied']) {
        this.notificationService.show('Authorization is required!', 'error');
      } else if (params['sessionExpired']) {
        this.notificationService.show('Please, login again.');
      }
    });
  }

  onSubmit() {
    this.spinner.show();
    this.authService.login(this.form.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.spinner.hide();
        this.notificationService.show(error.error.message, 'error');
      }
    );    
  }
}
