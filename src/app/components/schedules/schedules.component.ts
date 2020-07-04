import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {Schedule} from '../../models/Schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {Planning} from '../../models/Planning';
import {MatDialog} from '@angular/material/dialog';
import {AddScheduleComponent} from '../../dialogs/dialog-forms/add-schedule/add-schedule.component';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';

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
  @Output() outPutData = new EventEmitter<any>();
  showHideInput: boolean;
  schedules: Schedule[] = [];
  clickedPlanning: Planning = new Planning();
  loading: boolean;

  constructor(
    public dialog: MatDialog,
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
    console.log(this.clickedPlanning.schedule);
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

  openAddScheduleDialog() {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      width: '550px',
      height: '330px',
      panelClass: 'matDialogClass2',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadData();
      }
    });
  }

  openEditScheduleDialog(sch) {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      width: '550px',
      height: '330px',
      panelClass: 'matDialogClass2',
      data: sch
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadData();
        this.outPutData.emit();
      }
    });
  }

  sendScheduleToEdit(schh: Schedule) {
    for (const sch of this.schedules) {
      if (sch.scheduleId === schh.scheduleId) {
        this.openEditScheduleDialog(sch);
        break;
      }
    }
  }

  openDeleteDialog(sch) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [null, 'schedule']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scheduleService.remove(sch.scheduleId).subscribe(() => {
          console.log('Refreshing schedules..');
          this.reloadData();
          console.log('Refreshing plannings..');
          this.outPutData.emit();
        }, error1 => console.log(error1));
      }

    });
  }
}
