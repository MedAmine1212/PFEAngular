import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  deleteMessage() {
    let message: string;
    message = 'Are you sure you want to ';
    if (this.data[1] === 'employee') {
      message = message + 'remove ' + this.data[0].firstName + ' ' + this.data[0].name;
    } else {
      message = message + 'delete ';
      if (this.data[1] === 'department') {
        message = message + this.data[0].depName + ' department';
      } else if (this.data[1] === 'planning') {
        message = message + this.data[0].planningName + '   planning';
      } else if (this.data [1] === 'schedule') {
        message = message + 'this schedule';
      }
    }
    message = message + ' ?';
    return message;
  }
}