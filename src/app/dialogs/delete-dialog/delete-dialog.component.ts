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
    if (this.data[1] === 'dataBase') {
      message = message + 'overwrite your current data base';
    } else if (this.data[1] === 'rollback') {
      message = message + 'perform a rollback ';
    } else if (this.data[1] === 'removeDePl') {
      message = message + ' remove this department\'s planning';
    } else if (this.data[1] === 'employee') {
      message = message + 'remove ' + this.data[0].firstName + ' ' + this.data[0].name;
    } else if (this.data[1] === 'changePost') {
      message = message + 'override this user\'s post';
    } else if (this.data[1] === 'changeDepPl') {
      message = message + 'override this department\'s planning';
    } else {
      message = message + 'delete ';
      if (this.data[1] === 'department') {
        message = message + this.data[0].depName + ' department';
      } else if (this.data[1] === 'planning') {
        message = message + this.data[0].planningName + '   planning';
      } else if (this.data[1] === 'schedule') {
        message = message + 'this schedule';
      } else if (this.data[1] === 'post') {
        message = message + 'this post';
      } else if (this.data[1] === 'address') {
        message = message + 'this address';
      }
    }
    message = message + ' ?';
    if (this.data[1] === 'dataBase') {
      message = message + ' this process can harm your database !';
    } else if (this.data[1] === 'rollback') {
      message = message + ' this action cannot be undone !';
    }
    return message;
  }
}
