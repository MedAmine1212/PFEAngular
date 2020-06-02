import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  formGroup: FormGroup;
  pauseTime: boolean;
  repeatDays: string[] = [];
  color: string;
  iconColor: string;

  constructor(public dialogRef: MatDialogRef<AddScheduleComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>) { }

  ngOnInit(): void {
    this.color = 'btn btn-primary';
    this.iconColor = 'btn btn-outline-primary';
    this.pauseTime = false;
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
      color: ['', [Validators.required]],
    });
  }

  addRemoveDay(day: string) {
    if (this.repeatDays.indexOf(day) > -1) {
        this.repeatDays.splice(this.repeatDays.indexOf(day), 1);
    } else {
      this.repeatDays.push(day);
    }
  }

  choseColor(color: string) {
    this.color = 'btn btn-' + color;
    this.iconColor = 'btn btn-outline-' + color;
  }
}
