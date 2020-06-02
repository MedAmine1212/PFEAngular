import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../../../models/Schedule';
import {Planning} from '../../../models/Planning';
import {Observable} from 'rxjs';
import {DialogComponent} from '../../dialog.component';
import {ScheduleService} from '../../../services/schedule/schedule.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  dialogComponent: MatDialogRef<DialogComponent>;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  schedule: Schedule = new Schedule();
  planning: Planning = new Planning();
  minDate: Date;
  beginHour: string;
  endHour: string;
  startDate: string;
  endDate: string;
  pauseStartHour: string;
  pauseEndHour: string;

  constructor(public dialogRef: MatDialogRef<AddScheduleComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>,
              public dialog: MatDialog,
              private scheduleService: ScheduleService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    this.minDate = new Date(currentYear , currentMonth, currentDay);
    this.schedule.planning = [];
    this.pauseEndHour = '';
    this.pauseStartHour = '';
    this.schedule.color = 'btn btn-primary';
    this.schedule.colorIcon = 'btn btn-outline-primary';
    this.schedule.pauseTime = false;
    this.planning.scheduleDays = [];
  }

  ngOnInit(): void {
    this.scheduleService.list().subscribe(r => console.log(r));
    this.FormGroup();
    this.FormGroup2();
  }

  closeThis() {
    this.dialogRef.close(false);
  }

  FormGroup() {
    this.formGroup = this.formBuilder.group({
      schName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      beginHour: [this.beginHour, [Validators.required]],
      endHour: [this.endHour, [Validators.required]],
      repeatCyc: ['', [Validators.required], this.checkRepeatCycle.bind(this)],
    });
  }
  FormGroup2() {
    this.formGroup2 = this.formBuilder.group({
      pauseStartHour: ['', [Validators.required]],
      pauseEndHour: ['', [Validators.required]],
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
    this.schedule.color = 'btn btn-' + color;
    this.schedule.colorIcon = 'btn btn-outline-' + color;
  }

  addSchedule() {
    this.schedule.showSch = true;
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
    this.schedule.planning.push(this.planning);
    this.scheduleService.add(this.schedule).subscribe(user => {
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
}
