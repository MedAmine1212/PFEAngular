import { Component, OnInit } from '@angular/core';
import {Schedual} from '../../models/Schedual';


@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],

})
export class TimetablesComponent implements OnInit {
  hours: number[];
  days: string[];
  schedual: Schedual = new Schedual();
  schedual2: Schedual = new Schedual();
  schedual3: Schedual = new Schedual();
  schedual4: Schedual = new Schedual();
  scheduals: Schedual[] = [];
  time = new Date();
  showSch: boolean;
  showPause: boolean;
  constructor() {
    this.hours = Array(24).fill(0).map((x, i) => i);
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  ngOnInit(): void {
    this.showPause = false;
    this.showSch = false;
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.schedual.schedualId = 1;
    this.schedual.schedualName = 'Regular schedual';
    this.schedual.schedualDesc = 'Regular work hours schedular';
    this.schedual.startHour = 8;
    this.schedual.endHour = 17;
    this.schedual.schedualDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.schedual.repeadCycle = 1;
    this.schedual.color = 'btn btn-success';
    this.schedual.pauseTime = true;
    this.schedual.pauseStart = 12;
    this.schedual.pauseEnd = 14;

    this.schedual2.schedualId = 2;
    this.schedual2.schedualName = 'Half-Time schedual';
    this.schedual2.schedualDesc = 'Half-time work hours schedular';
    this.schedual2.startHour = 8;
    this.schedual2.endHour = 13;
    this.schedual2.schedualDays = ['Saturday'];
    this.schedual2.repeadCycle = 1;
    this.schedual2.color = 'btn btn-info';
    this.schedual2.pauseTime = false;

    this.schedual3.schedualId = 3;
    this.schedual3.schedualName = 'Custom schedual';
    this.schedual3.schedualDesc = 'Custom work hours schedular';
    this.schedual3.startHour = 8;
    this.schedual3.endHour = 17;
    this.schedual3.schedualDays = ['Monday', 'Wednesday', 'Friday'];
    this.schedual3.repeadCycle = 2;
    this.schedual3.color = 'btn btn-primary';
    this.schedual3.pauseTime = true;
    this.schedual3.pauseStart = 12;
    this.schedual3.pauseEnd = 14;

    this.schedual4.schedualId = 4;
    this.schedual4.schedualName = 'Custom2 schedual';
    this.schedual4.schedualDesc = 'Custom2 work hours schedular';
    this.schedual4.startHour = 8;
    this.schedual4.endHour = 17;
    this.schedual4.schedualDays = ['Tuesday', 'Thursday'];
    this.schedual4.repeadCycle = 2;
    this.schedual4.color = 'btn btn-warning';
    this.schedual4.pauseTime = false;

    this.scheduals.push(this.schedual);
    this.scheduals.push(this.schedual2);
    this.scheduals.push(this.schedual3);
    this.scheduals.push(this.schedual4);
  }

  setCliked(sch: Schedual, day: string, hour: number) {
    console.log(sch.schedualName + ': ' + sch.schedualDays.indexOf(day));
    console.log(day + ' ' + hour);
  }

  checkSch(sch: Schedual, day: string, hour: number) {
    this.showPause = false;
    this.showSch = false;
    if ( sch.schedualDays.indexOf(day) > -1 && sch.startHour <= hour && sch.endHour >= hour) {
     this.showSch = true;
   }
    if (sch.pauseTime) {
      if (sch.pauseStart <= hour && sch.pauseEnd > hour) {
        this.showSch = false;
        if (sch.schedualDays.indexOf(day) > -1) {
          this.showPause = true;
        }
      }
    }
  }

  showTip(hour: number) {
    let h: string;
    h = hour.toString();
    if (hour < 10) {
      h = '0' + h;
    }
    if (hour < 13) {
      h = h + ' AM';
    } else {
      h = h + ' PM';
    }
    return h;
  }
}
