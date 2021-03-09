import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Environment, environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  version: string;

  constructor() { }

  ngOnInit(): void {
    this.version = Environment.version;
  }

}
