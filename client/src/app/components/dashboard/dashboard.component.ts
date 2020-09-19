import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

}
