import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig, BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings-dropdown',
  templateUrl: './settings-dropdown.component.html',
  styleUrls: ['./settings-dropdown.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class SettingsDropdownComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  preferences(event: Event) {
    event.preventDefault();
    this.router.navigate(['/preferences']);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
