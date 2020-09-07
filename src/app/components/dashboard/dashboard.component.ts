import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SendModalComponent } from '../modal/send-modal/send-modal.component';
import { RequestModalComponent } from '../modal/request-modal/request-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
}
