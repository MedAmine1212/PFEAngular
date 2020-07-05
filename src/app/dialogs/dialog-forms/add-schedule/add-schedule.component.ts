import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../../../models/Schedule';
import {ScheduleService} from '../../../services/schedule/schedule.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-add-schedule',
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
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  formGroup: FormGroup;
  formGroup2: FormGroup;
  beginHour: string;
  endHour: string;
  schedule: Schedule;
  pauseStartHour: string;
  pauseEndHour: string;
  notChanged: boolean;
  constructor(

    @Inject(MAT_DIALOG_DATA) public sch: Schedule,
    public dialogRef: MatDialogRef<AddScheduleComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService) {
    if (sch == null) {
      this.schedule = new Schedule();
      this.endHour = '';
      this.pauseEndHour = '';
      this.pauseStartHour = '';
      this.beginHour = '';
      this.schedule.plannings = [];
      this.schedule.pauseTime = false;
    }

  }

  ngOnInit() {

    setTimeout(() => {
      this.FormGroup();
      this.FormGroup2();
    }, 600);
    if (this.sch != null) {

      this.schedule = this.sch;
      setTimeout( () => {
        this.notChanged = true;
        this.setTimes();
    }, 1000);
  }
    }

  private setTimes() {
    this.beginHour = this.setTimeString(this.sch.startHour);
    this.endHour = this.setTimeString(this.sch.endHour);
    if (this.sch.pauseTime) {
      this.pauseStartHour = this.setTimeString(this.sch.pauseStart);
      this.pauseEndHour = this.setTimeString(this.sch.pauseEnd);
    }
  }
  setTimeString(time) {
    const h = Math.floor(time / 60);
    const m = time % 60;
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
  FormGroup() {
    this.formGroup = this.formBuilder.group({
      beginHour: [this.beginHour, [Validators.required]],
      endHour: [this.endHour, [Validators.required]],
    });
  }
  FormGroup2() {
    this.formGroup2 = this.formBuilder.group({
      pauseStartHour: ['', [Validators.required]],
      pauseEndHour: ['', [Validators.required]],
    });
  }
  addSchedule() {
      this.setFinalSchedule();
      console.log(this.schedule);
      this.scheduleService.add(this.schedule).subscribe(sch => {
        this.dialogRef.close(true);
    }, error1 => console.log(error1));
  }

  modifySchedule() {
    this.setFinalSchedule();
    console.log(this.schedule.plannings[0].planningConfigs = null);
    this.scheduleService.modify(this.schedule, this.schedule.scheduleId).subscribe(() => {
      this.dialogRef.close(true);
    }, error1 => console.log(error1));
  }
  setFinalSchedule() {
    this.schedule.startHour = (Number.parseInt(this.beginHour, 0) * 60) +
      Number.parseInt(this.beginHour.slice(3, this.beginHour.length), 0);
    this.schedule.endHour = (Number.parseInt(this.endHour, 0) * 60) +
      Number.parseInt(this.endHour.slice(3, this.endHour.length), 0);
    if (this.schedule.pauseTime) {
    this.schedule.pauseStart = (Number.parseInt(this.pauseStartHour, 0) * 60) +
      Number.parseInt(this.pauseStartHour.slice(3, this.pauseStartHour.length), 0);
    this.schedule.pauseEnd = (Number.parseInt(this.pauseEndHour, 0) * 60) +
      Number.parseInt(this.pauseEndHour.slice(3, this.pauseEndHour.length), 0);
    } else {
      this.schedule.pauseStart = 0;
      this.schedule.pauseEnd = 0;
    }
  }
  closeThis() {
    this.dialogRef.close(false);
  }
}
