import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Planning} from '../../models/Planning';

@Component({
  selector: 'app-delete-planning-dialog',
  templateUrl: './delete-planning-dialog.component.html',
  styleUrls: ['./delete-planning-dialog.component.css']
})
export class DeletePlanningDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletePlanningDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
