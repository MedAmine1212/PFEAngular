import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/User';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  showUpdateForm: boolean;
  showAddressUpdateForm: boolean;

  constructor(
  public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public emp: User) {}

  ngOnInit(): void {
    this.showUpdateForm = false;
    this.showAddressUpdateForm = false;
  }

  saveAddresses() {

  }

  saveUser() {

  }
}
