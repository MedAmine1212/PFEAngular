import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-nav',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(200%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(100%)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(200%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'enterSecondAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0%)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0%)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    )
  ],
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
