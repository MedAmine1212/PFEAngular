import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../../../models/Schedule';
import {Planning} from '../../../models/Planning';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  formGroup: FormGroup;
  schedule: Schedule = new Schedule();
  planning: Planning = new Planning();

  constructor(public dialogRef: MatDialogRef<AddScheduleComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>) { }

  ngOnInit(): void {
    this.planning.schedule = this.schedule;
    this.schedule.color = 'btn btn-primary';
    this.schedule.colorIcon = 'btn btn-outline-primary';
    this.schedule.pauseTime = false;
    this.planning.scheduleDays = [];
    this.FormGroup();
  }

  closeThis() {
    this.dialogRef.close(false);
  }

  FormGroup() {
    this.formGroup = this.formBuilder.group({
      schName: ['', [Validators.required]],
      schDesc: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      beginHour: ['', [Validators.required]],
      repeatCyc: ['', [Validators.required]],
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
  }
}
