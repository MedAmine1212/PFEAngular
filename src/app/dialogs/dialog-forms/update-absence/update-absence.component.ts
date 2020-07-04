import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Absence} from '../../../models/Absence';
import {AbsenceService} from '../../../services/absence/absence.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-update-absence',
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
  templateUrl: './update-absence.component.html',
  styleUrls: ['./update-absence.component.css']
})
export class UpdateAbsenceComponent implements OnInit {
  formGroup: FormGroup;
  newAbsence: Absence;
  notChanged: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public absence: Absence,
    public dialogRef: MatDialogRef<UpdateAbsenceComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService
  ) {
    this.newAbsence = new Absence();
    this.newAbsence.idAbsence = this.absence.idAbsence;
    this.newAbsence.reasonStatus = this.absence.reasonStatus;
    this.newAbsence.absentMinutes = this.absence.absentMinutes;
    this.newAbsence.absenceDate = this.absence.absenceDate;
    this.newAbsence.absenceType = this.absence.absenceType;
    this.newAbsence.revisedBy = this.absence.revisedBy;
    this.newAbsence.user = null;
    this.newAbsence.reason = '';
    if (this.absence.reason != null) {
      this.newAbsence.reason = this.absence.reason;
    }
  }

  ngOnInit(): void {
    this.notChanged = true;
    setTimeout(() => {
      this.formGroupBuild();
    }, 600);
  }

  formGroupBuild() {
    this.formGroup = this.formBuilder.group({
      reason: [this.newAbsence.reason, [Validators.required]]
    });
  }
  closeThis() {
    this.dialogRef.close(false);
  }

  updateAbsence() {
    this.absence.reason = this.newAbsence.reason;
    this.absence.reasonStatus = 'btn btn-warning';
    this.newAbsence.reasonStatus = 'btn btn-warning';
    this.absenceService.modify(this.newAbsence, this.absence.idAbsence).subscribe(() => {
      this.dialogRef.close(true);
    }, error => console.log(error));
  }

  checkValue(event) {
    // tslint:disable-next-line:triple-equals
    if (this.absence.reason == event.value) {
      this.notChanged = true;
    } else {
      this.notChanged = false;
    }
  }
}
