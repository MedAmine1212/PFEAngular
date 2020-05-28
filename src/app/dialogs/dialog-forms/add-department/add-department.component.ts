import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../../models/Department';
import {DepartmentService} from '../../../services/departement/department.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeleteDepDialogComponent} from '../../delete-dep-dialog/delete-dep-dialog.component';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  registerForm: FormGroup;
  dep: Department;
  departments: Department[];
  department: Department = new Department();
  public sender: number;
  newName: string;
  constructor(public dialogRef: MatDialogRef<AddDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>,
              private formBuilder: FormBuilder, private departmentService: DepartmentService ) { }

  ngOnInit(): void {
    this.sender = 1;
    this.newName = '';
    if (this.data != null) {
      this.dep = this.data[0];
      this.sender = this.data[1];
    }
    if (this.sender === 2) {
      this.department = this.dep;
    }
    this.registerForm = this.formBuilder.group({
      depName: [this.department.depName, [Validators.required]]
    });

    }
  get f() { return this.registerForm.controls; }
  closeThis() {
    this.dialogRef.close();
  }

  addDep() {
    if (this.dep != null) {
      this.department.supDep = this.dep;
    }
    this.departmentService.add(this.department).subscribe(data => console.log('done'), error1 => console.log(error1));
    this.dialogRef.close();
  }

  updateDep() {
    this.department.depName = this.newName;
    this.departmentService.modify(this.department.depId, this.department).subscribe(
      data => console.log('done'), error1 => console.log(error1));
    this.dialogRef.close();
  }
}

