import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {Schedule} from '../../models/Schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {Planning} from '../../models/Planning';

@Component({
  selector: 'app-schedules',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('0ms', style({opacity: 0}))
        ])
      ]
    ),
    ],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  showHideInput: boolean;
  schedules: Schedule[] = [];
  clickedPlanning: Planning = new Planning();
  loading: boolean;

  constructor(
    private scheduleService: ScheduleService,
    private themeChanger: ThemeChangerService) {
    this.clickedPlanning.schedule = null;
  }

  ngOnInit(): void {
    this.loading = false;
    this.reloadData();
    this.showHideInput = false;
  }

  public setClickedPl(pl: Planning) {
    this.clickedPlanning = pl;
    if (pl.schedule != null) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
  getTheme() {
    return this.themeChanger.getTheme();
  }

  reloadData() {
    this.scheduleService.list().subscribe(r => {
      this.schedules = r;
    }, error => console.log(error));
  }

  getTime(hour: number) {
    const h = Math.floor(hour / 60);
    const m = hour % 60;
    let returnTime: string;
    returnTime = '';
    if (h < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + h.toString() + ':';
    if (m < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + m.toString();
    return returnTime;
  }
}
