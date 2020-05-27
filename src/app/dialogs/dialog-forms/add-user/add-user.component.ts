import {AfterViewInit, Component, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Department} from '../../../models/Department';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/departement/department.service';
import {MatStepper} from '@angular/material/stepper';
import {animate, style, transition, trigger} from '@angular/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeleteDepDialogComponent} from '../../delete-dep-dialog/delete-dep-dialog.component';

@Component({
  selector: 'app-add-user',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
    ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit  {
  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  cin: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  departments: Department[];
  dep: Department;
  showOtherAddress: boolean;
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Department,
              private formBuilder: FormBuilder, private departmentService: DepartmentService) {
  if (this.data != null ) {
      this.dep = null;
      this.dep = this.data;
  }
  }

  ngAfterViewInit(): void {
    this.showOtherAddress = false;
    this.departments = [];
    if (this.dep == null) {
    this.departmentService.list().subscribe(r => {
      this.departments = r;
    });
    } else {
      this.stepper.selectedIndex = 1;
    }
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  closeThis() {
    this.dialogRef.close();
  }

  addUser() {
  }

  checkCin(input: any) {
    // tslint:disable-next-line:radix
      if (input.target.value.length > 8 || (input.data != null && isNaN(Number.parseInt(input.data)))) {
        input.target.value = this.cin;
      } else {
        this.cin = input.target.value;
      }
    }

  nextSection() {

    this.stepper.selectedIndex++;
  }
}
