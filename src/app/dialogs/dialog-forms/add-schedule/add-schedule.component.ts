import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../../../models/Schedule';
import {Planning} from '../../../models/Planning';
import {Observable} from 'rxjs';
import {DialogComponent} from '../../dialog.component';
import {ScheduleService} from '../../../services/schedule/schedule.service';
import {MatStepper} from '@angular/material/stepper';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-add-schedule',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    ],
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements AfterViewInit {
  dialogComponent: MatDialogRef<DialogComponent>;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  schedules: Schedule[] = [];
  schedule: Schedule = new Schedule();
  planning: Planning = new Planning();
  minDate: Date;
  beginHour: string;
  endHour: string;
  startDate: string;
  endDate: string;
  pauseStartHour: string;
  pauseEndHour: string;
  formGroup3: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  newSch: boolean;
  startHour: number;
  startMinutes: number;
  endMinutes: number;
  pauseStart: number;
  pauseStartMinutes: number;
  pauseEnd: number;
  pauseEndMinutes: number;
  endHour2: number;

  constructor(public dialogRef: MatDialogRef<AddScheduleComponent>,
              @Inject(MAT_DIALOG_DATA) public pl: Planning,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private scheduleService: ScheduleService) {
    this.newSch = true;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    this.minDate = new Date(currentYear , currentMonth, currentDay);
    if (this.pl !== null) {
      this.planning = this.pl;
      this.schedule = this.pl.schedule;
      this.startDate = pl.startDate;
      this.endDate = pl.endDate;
      console.log(this.planning);
    } else {
    this.schedule.plannings = [];
    this.pauseEndHour = '';
    this.pauseStartHour = '';
    this.planning.color = 'btn btn-primary';
    this.planning.colorIcon = 'btn btn-outline-primary';
    this.schedule.pauseTime = false;
    this.planning.scheduleDays = [];
    }
    this.startMinutes = 0;
    this.endMinutes = 0;
    this.pauseStartMinutes = 0;
    this.pauseEndMinutes = 0;
    this.startHour = 0;
    this.endHour2 = 0;
    this.pauseStart = 0;
    this.pauseEnd = 0;
  }

  ngAfterViewInit(): void {
    this.reloadSchedules();
    this.FormGroup();
    this.FormGroup2();
    this.FormGroup3();

    if (this.pl !== null) {
      setTimeout(() => {
        this.stepper.selectedIndex = 1;
      }, 600);
    }
  }
  reloadSchedules() {
    this.schedules = [];
    this.scheduleService.list().subscribe(r => {
      this.schedules = r;
    });
  }

  closeThis() {
    this.dialogRef.close(false);
  }

  FormGroup() {
    this.formGroup = this.formBuilder.group({
      schName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      repeatCyc: ['', [Validators.required], this.checkRepeatCycle.bind(this)],
    });
  }
  FormGroup2() {
    this.formGroup2 = this.formBuilder.group({
      pauseStartHour: ['', [Validators.required]],
      pauseEndHour: ['', [Validators.required]],
    });
  }
  FormGroup3() {
    this.formGroup3 = this.formBuilder.group({
      beginHour: [this.beginHour, [Validators.required]],
      endHour: [this.endHour, [Validators.required]],
    });
  }
  addRemoveDay(day: string) {
    if (this.planning.scheduleDays.indexOf(day) > -1) {
        this.planning.scheduleDays.splice(this.planning.scheduleDays.indexOf(day), 1);
    } else {
      this.planning.scheduleDays.push(day);
    }
  }

  choseColor(color: string) {
    this.planning.color = 'btn btn-' + color;
    this.planning.colorIcon = 'btn btn-outline-' + color;
  }

  addSchedule() {
    this.planning.showPl = true;
    this.schedule.startHour = (Number.parseInt(this.beginHour, 0) * 60) +
      Number.parseInt(this.beginHour.slice(3, this.beginHour.length), 0);
    this.schedule.endHour = (Number.parseInt(this.endHour, 0) * 60) +
      Number.parseInt(this.endHour.slice(3, this.endHour.length), 0);
    this.schedule.pauseStart = (Number.parseInt(this.pauseStartHour, 0) * 60) +
      Number.parseInt(this.pauseStartHour.slice(3, this.pauseStartHour.length), 0);
    this.schedule.pauseEnd = (Number.parseInt(this.pauseEndHour, 0) * 60) +
      Number.parseInt(this.pauseEndHour.slice(3, this.pauseEndHour.length), 0);
    this.planning.startDate = this.startDate;
    this.planning.endDate = this.endDate;
    this.schedule.plannings.push(this.planning);
    this.scheduleService.add(this.schedule).subscribe(sch => {
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '400px',
        data : 'Schedule added successfully ! '
      });
      this.dialogComponent.afterClosed().subscribe(() =>
        this.dialogRef.close(true)
      );
    }, error1 => console.log(error1));

  }

  checkRepeatCycle(control) {
    return new Observable(observer => {
        const result = (control.value < 1) ? { invalidRepeatCycle: true } : null;
        observer.next(result);
        observer.complete();
    });
  }

  updateSchedule() {
    console.log('haw zebi');
  }

  isNewSch() {
    if (this.schedules.length > 0 ) {
      this.newSch = !this.newSch;
    }
  }
  private getTime(sch) {
    this.startHour = Math.floor(sch.startHour / 60);
    this.startMinutes = sch.startHour % 60;
    this.endHour2 = Math.floor(sch.endHour / 60);
    this.endMinutes = sch.endHour % 60;
    if (sch.pauseTime) {
      this.pauseStart = Math.floor(sch.pauseStart / 60);
      this.pauseStartMinutes = sch.pauseStart % 60;
      this.pauseEnd = Math.floor(sch.pauseEnd / 60);
      this.pauseEndMinutes = sch.pauseEnd % 60;
    }
  }
  returnSchDesc(sch: Schedule) {
    this.getTime(sch);
    let desc: string;
    desc = 'Schedule id: ' + sch.scheduleId + ', From: ';
    if (this.startHour < 10) {
      desc = desc + '0';
    }
    desc = desc + this.startHour + ':';
    if (this.startMinutes < 10) {
      desc = desc + '0';
    }
    desc = desc + this.startMinutes + ', To: ';

    if (this.endHour2 < 10) {
      desc = desc + '0';
    }
    desc = desc + this.endHour2 + ':';
    if (this.endMinutes < 10) {
      desc = desc + '0';
    }
    desc = desc + this.endMinutes;

    if (!sch.pauseTime) {
      desc = desc + ' , No pause time.';
    } else {
        // pause time

      desc = desc + ' , Pause time From: ';
      if (this.pauseStart < 10) {
        desc = desc + '0';
      }
      desc = desc + this.pauseStart + ':';
      if (this.pauseStartMinutes < 10) {
        desc = desc + '0';
      }
      desc = desc + this.pauseStartMinutes + ', To: ';

      if (this.pauseEnd < 10) {
        desc = desc + '0';
      }
      desc = desc + this.pauseEnd + ':';
      if (this.pauseEndMinutes < 10) {
        desc = desc + '0';
      }
      desc = desc + this.pauseEndMinutes;
    }
    return desc;
  }
}
