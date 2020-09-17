import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestModalComponent } from 'src/app/components/modal/request-modal/request-modal.component';
import { SendModalComponent } from 'src/app/components/modal/send-modal/send-modal.component';
import { SettingsDropdownComponent } from 'src/app/shared/dropdown/settings-dropdown/settings-dropdown.component';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  public openSendModal(): void {
    this.bsModalRef = this.modalService.show(SendModalComponent);
  }

  public openRequestModal(): void {
    this.bsModalRef = this.modalService.show(RequestModalComponent);
  }

  public openDropdown(): void {
    this.bsModalRef = this.modalService.show(SettingsDropdownComponent);
  }
}
