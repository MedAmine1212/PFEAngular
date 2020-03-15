import {Component, Inject, OnInit} from '@angular/core';
import {Department} from '../../models/Department';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
interface DepName {
  depName: string;
}
@Component({
  selector: 'app-delete-dep-dialog',
  templateUrl: './delete-dep-dialog.component.html',
  styleUrls: ['./delete-dep-dialog.component.css']
})
export class DeleteDepDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDepDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public depName: DepName) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.depName);
  }
}
