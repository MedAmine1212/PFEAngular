import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  private isMobile: boolean;

  constructor() { }

  ngOnInit() {
    this.isMobile = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  }

}
