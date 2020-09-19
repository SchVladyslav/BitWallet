import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.sub = this.authService.signup(this.form.value)
    .subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },
      (error) => {
        this.notificationService.show(error.error.message, 'error');
        this.form.enable();
      }
    );
  }

}
