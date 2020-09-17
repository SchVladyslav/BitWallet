import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      wallet: new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]), // 1-st param - get from storage wallet id
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    
  }

}
