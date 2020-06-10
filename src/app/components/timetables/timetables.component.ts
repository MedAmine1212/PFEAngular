import { Component, OnInit } from '@angular/core';
import {Schedule} from '../../models/Schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {AddPlanningComponent} from '../../dialogs/dialog-forms/add-planning/add-planning.component';
import {MatDialog} from '@angular/material/dialog';
import {PlanningService} from '../../services/planning/planning.service';
import {Planning} from '../../models/Planning';
import {DeletePlanningDialogComponent} from '../../dialogs/delete-planning-dialog/delete-planning-dialog.component';


@Component({
  selector: 'app-timetables',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('600ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('0ms', style({opacity: 0}))
        ])
      ]
    ),
    ],
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
  menuTop: string;
  showMenu: boolean;
  rightClicked: Planning;
  showTable: boolean;
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
    this.menuTop = '0';
    this.showMenu = false;
  }

  ngOnInit(): void {
    this.showTable = false;
    setTimeout(() => {
      this.showTable = true;
    }, 2000);
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
    console.log(pl.planningName + ': ' + pl.scheduleDays.indexOf(day));
    console.log(day + ' ' + hour);
  }

  checkSch(pl: Planning, day: string, hour: number) {
    this.showPause = false;
    this.showSch = false;
    this.getTime(pl);
    if (pl.showPl) {
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
    h = h + ':';
    this.getTime(pl);
    if ( this.startHour === hour && this.startMinutes > 0) {
      if (this.startMinutes < 10) {
        h = h + '0';
      }
      h = h + this.startMinutes.toString();
    } else if (this.endHour === hour && this.endMinutes > 0) {
      if (this.endHour < 10) {
        h = h + '0';
      }
      h = h + this.endMinutes.toString();
    } else {
    h = h + ':00';
    }
    return h;
  }

  showAll() {
    this.selectedCount = this.plannings.length;
    for (const pl of this.plannings) {
      pl.showPl = true;
    }

  }


  hideAll() {
    this.selectedCount = 0;
    for (const pl of this.plannings) {
      pl.showPl = false;
    }
  }

  showHideSch(pl: Planning) {
    pl.showPl = !pl.showPl;

    if (pl.showPl) {
      this.selectedCount++;
    } else {
      this.selectedCount--;
    }
  }

  addPlanning() {
    const dialogRef = this.dialog.open(AddPlanningComponent, {
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
      for (const pl of this.plannings) {
        if (pl.showPl) {
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

  onRightClick(e, pl) {
    this.rightClicked = pl;
    e.preventDefault();
    this.showMenu = true;
    this.menuTop = (e.pageY - 35) + 'px';
  }

  noClick() {
    if (this.showMenu) {
        this.showMenu = false;
    }
  }

  openDeletePlanDialog() {
    if (this.showMenu) {
      const dialogRef = this.dialog.open(DeletePlanningDialogComponent, {
        width: '400px',
        height: '380',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.planningService.remove(this.rightClicked.planningId).subscribe(() => {
            this.rightClicked = null;
            console.log('Refreshing plannings..');
            this.reloadData();
          }, error1 => console.log(error1));
        }

      });
    }
  }

  openDetailsDialog() {
    if (this.showMenu) {
      const dialogRef = this.dialog.open(AddPlanningComponent, {
        width: '900px',
        height: '625px',
        panelClass: 'matDialogClass2',
        data: this.rightClicked
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.rightClicked = null;
            console.log('Refreshing plannings..');
            this.reloadData();
        }

      });
    }
  }
}
