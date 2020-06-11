import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';

@Component({
  selector: 'app-schedules',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    ),
    ],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  constructor(private themeChanger: ThemeChangerService) { }

  ngOnInit(): void {
  }
  getTheme() {
    return this.themeChanger.getTheme();
  }
}
