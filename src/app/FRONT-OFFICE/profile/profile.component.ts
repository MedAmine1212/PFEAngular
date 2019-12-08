import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showDetails: boolean;
  showOrder: boolean;
  constructor() { }

  ngOnInit() {
    this.showDetails = false;
    this.showOrder = false;
  }

  closeDetailsCom() {
    this.showDetails = false;
  }

  showDetailsCom() {
    this.showDetails = true;
  }

  closeDetailsComEv($event: boolean) {
    if ($event) {
      this.closeDetailsCom();
    }
  }
  closeOrderCom() {
    this.showOrder = false;
  }
  closeOrderComEv($event: boolean) {
    if ($event) {
      this.closeOrderCom();
    }
  }
  showOrdersCom() {
    this.showOrder = true;
  }
}
