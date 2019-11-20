import { Component, OnInit } from '@angular/core';
import {style} from '@angular/animations';
import {NavComponent} from '../nav/nav.component';

@Component({
  selector: 'app-mini-panier',
  templateUrl: './mini-panier.component.html',
  styleUrls: ['./mini-panier.component.css']
})
export class MiniPanierComponent implements OnInit {

  constructor(private navComponent: NavComponent) { }

  ngOnInit() {
  }

  hide() {
    this.navComponent.hideShowPan(2);
  }
}
