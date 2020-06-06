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
  pauseStartMinutes: number;
  pauseEndMinutes: number;
  startMinutes: number;
  endMinutes: number;
  showHideInput: boolean;
  plannings: Planning[] = [];
  time = new Date();
  showSch: boolean;
  showPause: boolean;
  selectedCount: number;
  desc: string;
  startHour: number;
  endHour: number;
  pauseStart: number;
  pauseEnd: number;
  constructor(public dialog: MatDialog, private  scheduleService: ScheduleService, private  planningService: PlanningService) {
    this.hours = Array(24).fill(6).map((x, i) => i);
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.startMinutes = 0;
    this.endMinutes = 0;
    this.pauseStartMinutes = 0;
    this.pauseEndMinutes = 0;
    this.startHour = 0;
    this.endHour = 0;
    this.pauseStart = 0;
    this.pauseEnd = 0;
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
    this.getTime(pl);
    if (pl.schedule.showSch) {
      if ( pl.scheduleDays.indexOf(day) > -1 && this.startHour <= hour && this.endHour >= hour) {
        this.showSch = true;
      }
      if (pl.schedule.pauseTime) {
        if (this.pauseStart <= hour && this.pauseEnd > hour) {
          this.showSch = false;
          if (pl.scheduleDays.indexOf(day) > -1) {
            this.showPause = true;
          }
        }
      }
    }
  }

  showTip(hour: number, pl: Planning) {
    let h: string;
    h = hour.toString();
    if (hour < 10) {
      h = '0' + h;
    }
    this.getTime(pl);
    if ( this.startHour === hour) {
      h = h + ':' + this.startMinutes.toString();
    } else if (this.endHour === hour) {
      h = h + ':' + this.endMinutes.toString();
    } else {
    h = h + ':00';
    }
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
      if (pl.scheduleDays.indexOf(day) < (pl.scheduleDays.length - 1)) {
        this.desc = this.desc + ',';
      }
    }
    this.desc = this.desc + ']';
    return this.desc;
  }

  returnWidth(minutes) {
    return Math.floor((minutes * 100 ) / 60 )  + '% !important';
  }

  private getTime(pl) {
    this.startHour = Math.floor(pl.schedule.startHour / 60);
    this.startMinutes = pl.schedule.startHour % 60;
    this.endHour = Math.floor(pl.schedule.endHour / 60);
    this.endMinutes = pl.schedule.endHour % 60;
    this.pauseStart = Math.floor(pl.schedule.pauseStart / 60);
    this.pauseStartMinutes = pl.schedule.pauseStart % 60;
    this.pauseEnd = Math.floor(pl.schedule.pauseEnd / 60);
    this.pauseEndMinutes = pl.schedule.pauseEnd % 60;

  }
}
