import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestModalComponent } from 'src/app/components/modal/request-modal/request-modal.component';
import { SendModalComponent } from 'src/app/components/modal/send-modal/send-modal.component';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { SettingsDropdownComponent } from 'src/app/shared/dropdown/settings-dropdown/settings-dropdown.component';
import { NavigationList } from '../../../../interfaces/NavigationList';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  public balance: number;
  bsModalRef: BsModalRef;
  links: NavigationList[] = [
    {url: '/dashboard', name: 'Dashboard', ticker: 'dashboard', img: '../../../assets/icons/svg/icon-dashboard.svg'},
    {url: '/btc', name: 'Bitcoin', ticker: 'btc', img: '../../../assets/icons/svg/icon-Bitcoin.svg'},
    {url: '/ether', name: 'Ether', ticker: 'eth', img: '../../../assets/icons/svg/icon-Ethereum.svg'},
    {url: '/ripple', name: 'Ripple', ticker: 'xrp', img: '../../../assets/icons/svg/icon-Xrp.svg'},
  ];

  constructor(private modalService: BsModalService, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.blockchainService.getBalance().subscribe(balance => this.balance = balance);
  }

  public openSendModal(): void {
    this.bsModalRef = this.modalService.show(SendModalComponent);
  }

  public openRequestModal(): void {
    this.bsModalRef = this.modalService.show(RequestModalComponent);
  }
}
