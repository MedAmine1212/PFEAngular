import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../../../models/Schedule';
import {ScheduleService} from '../../../services/schedule/schedule.service';
import {DialogComponent} from '../../dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {animate, style, transition, trigger} from "@angular/animations";

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
export class AddScheduleComponent implements AfterViewInit {
  dialogComponent: MatDialogRef<DialogComponent>;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  beginHour: string;
  endHour: string;
  schedule: Schedule;
  pauseStartHour: string;
  pauseEndHour: string;
  constructor(
    public dialogRef: MatDialogRef<AddScheduleComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService) {
    this.schedule = new Schedule();
    this.schedule.plannings = [];
    this.schedule.pauseTime = false;
    this.pauseEndHour = '';
    this.pauseStartHour = '';
    this.beginHour = '';
    this.endHour = '';

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.FormGroup();
      this.FormGroup2();
    }, 600);
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
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '400px',
        data : 'Schedule added successfully ! '
      });
      this.dialogComponent.afterClosed().subscribe(() =>
        this.dialogRef.close(true)
      );
    }, error1 => console.log(error1));
  }

  modifySchedule() {
    this.setFinalSchedule();
    this.scheduleService.modify(this.schedule, this.schedule.scheduleId).subscribe(() => {
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '400px',
        data : 'Schedule updated successfully ! '
      });
      this.dialogComponent.afterClosed().subscribe(() =>
        this.dialogRef.close(true)
      );
    }, error1 => console.log(error1));
  }
  setFinalSchedule() {
    this.schedule.plannings = [];
    this.schedule.startHour = (Number.parseInt(this.beginHour, 0) * 60) +
      Number.parseInt(this.beginHour.slice(3, this.beginHour.length), 0);
    this.schedule.endHour = (Number.parseInt(this.endHour, 0) * 60) +
      Number.parseInt(this.endHour.slice(3, this.endHour.length), 0);
    this.schedule.pauseStart = (Number.parseInt(this.pauseStartHour, 0) * 60) +
      Number.parseInt(this.pauseStartHour.slice(3, this.pauseStartHour.length), 0);
    this.schedule.pauseEnd = (Number.parseInt(this.pauseEndHour, 0) * 60) +
      Number.parseInt(this.pauseEndHour.slice(3, this.pauseEndHour.length), 0);
  }
  closeThis() {
    this.dialogRef.close(false);
  }
}
