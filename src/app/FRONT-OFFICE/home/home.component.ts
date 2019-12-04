import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isMobile: boolean;
  private thisPage: string;
  constructor() {
  }

  ngOnInit() {
    this.thisPage = 'home';
    this.isMobile = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  }
}

