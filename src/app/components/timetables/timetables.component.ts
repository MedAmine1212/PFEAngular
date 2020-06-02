import { Component, OnInit } from '@angular/core';
import {Schedule} from '../../models/Schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {AddScheduleComponent} from '../../dialogs/dialog-forms/add-schedule/add-schedule.component';
import {MatDialog} from '@angular/material/dialog';
import {PlanningService} from '../../services/planning/planning.service';
import {Planning} from '../../models/Planning';


@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],

})
export class TimetablesComponent implements OnInit {
  hours: number[];
  days: string[];
  searchText;
  showHideInput: boolean;
  plannings: Planning[] = [];
  time = new Date();
  showSch: boolean;
  showPause: boolean;
  selectedCount: number;
  desc: string;
  constructor(public dialog: MatDialog, private  scheduleService: ScheduleService, private  planningService: PlanningService) {
    this.hours = Array(24).fill(6).map((x, i) => i);
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  ngOnInit(): void {
    this.selectedCount = 0;
    this.showHideInput = false;
    this.showPause = false;
    this.showSch = false;
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.reloadData();

  }

  setCliked(pl: Planning, day: string, hour: number) {
    console.log(pl.schedule.scheduleName + ': ' + pl.scheduleDays.indexOf(day));
    console.log(day + ' ' + hour);
  }

  checkSch(pl: Planning, day: string, hour: number) {
    this.showPause = false;
    this.showSch = false;
    if (pl.schedule.showSch) {
      if ( pl.scheduleDays.indexOf(day) > -1 && pl.schedule.startHour <= hour && pl.schedule.endHour >= hour) {
        this.showSch = true;
      }
      if (pl.schedule.pauseTime) {
        if (pl.schedule.pauseStart <= hour && pl.schedule.pauseEnd > hour) {
          this.showSch = false;
          if (pl.scheduleDays.indexOf(day) > -1) {
            this.showPause = true;
          }
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
    h = h + ':00';
    return h;
  }

  showAll() {
    this.selectedCount = this.plannings.length;
    for (const pl of this.plannings) {
      pl.schedule.showSch = true;
    }

  }


  hideAll() {
    this.selectedCount = 0;
    for (const pl of this.plannings) {
      pl.schedule.showSch = false;
    }
  }

  showHideSch(pl: Planning) {
    pl.schedule.showSch = !pl.schedule.showSch;

    if (pl.schedule.showSch) {
      this.selectedCount++;
    } else {
      this.selectedCount--;
    }
  }

  addSchedule() {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      width: '800px',
      height: '620px',
      data: null
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.reloadData();
      }
    });
  }

  private reloadData() {
    this.planningService.list().subscribe(list => {
      this.plannings = list;
      console.table(this.plannings);
      for (const pl of this.plannings) {
        if (pl.schedule.showSch) {
          this.selectedCount++;
        }
      }
    });
  }

  planningDaysDesc(pl: Planning) {
    this.desc = '[';
    for (const day of pl.scheduleDays) {
      this.desc = this.desc + day.slice(0, 2);
      if (pl.scheduleDays.indexOf(day) < (pl.scheduleDays.length - 1)){
        this.desc = this.desc + ',';
      }
    }
    this.desc = this.desc + ']';
    return this.desc;
  }
}
