import { Component, OnInit } from '@angular/core';
import {CategoryListComponent} from '../category-list/category-list.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor() { }
  private isOn: boolean;
  private isOnP: boolean;
  ngOnInit() {
    this.isOn = false;
    this.isOnP = false;
  }

  hideShowCat() {
    this.isOn = !this.isOn;
  }
  hideShowPan() {
    this.isOnP = !this.isOnP;
  }
}
