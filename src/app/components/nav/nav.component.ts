import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {RemoteMonotoringComponent} from '../remote-monotoring/remote-monotoring.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  showLight: boolean;
  showDark: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showLight = true;
    this.showDark = false;
  }
}
