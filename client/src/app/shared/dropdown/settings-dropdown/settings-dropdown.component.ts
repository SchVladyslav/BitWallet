import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings-dropdown',
  templateUrl: './settings-dropdown.component.html',
  styleUrls: ['./settings-dropdown.component.scss'],
})
export class SettingsDropdownComponent implements OnInit {

  dropdownVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public toggleDropdown(): void {
    this.dropdownVisible =  this.dropdownVisible ? false : true;
  }

  preferences(event: Event) {
    event.preventDefault();
    this.router.navigate(['/preferences']);
    this.toggleDropdown();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
