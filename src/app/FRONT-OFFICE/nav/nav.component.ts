import { Component, OnInit } from '@angular/core';
import {CategoryListComponent} from '../category-list/category-list.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MiniPanierComponent} from '../mini-panier/mini-panier.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '0.9'
      })),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms'))
    ]),
  ]
})
export class NavComponent implements OnInit {
  constructor() { }
  private isOnP: boolean;
  ngOnInit() {
    this.isOnP = true;
  }

  hideShowPan(x) {
    if (x === 1) {
      this.isOnP = false;

    } else {
      console.log('closed here');
      this.isOnP = true;
    }

  }
}
