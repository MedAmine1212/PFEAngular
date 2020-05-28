import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../../models/Department';
import {DepartmentService} from '../../../services/departement/department.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeleteDepDialogComponent} from '../../delete-dep-dialog/delete-dep-dialog.component';
import {DepartmentsComponent} from '../../../components/departments/departments.component';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  registerForm: FormGroup;
  editForm: FormGroup;
  dep: Department;
  departments: Department[];
  department: Department = new Department();
  public sender: number;
  newName: string;
  constructor(public dialogRef: MatDialogRef<AddDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>,
              private formBuilder: FormBuilder, private departmentService: DepartmentService,
              ) { }

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
    this.createFormGroup();
    this.createEditFormGroup();
    }
  private createFormGroup() {
    this.registerForm = this.formBuilder.group({
      depName: [this.department.depName, [Validators.required, Validators.pattern('[a-zA-Z ]*'),  Validators.minLength(3)]]
    });
  }
  createEditFormGroup() {
    this.editForm = this.formBuilder.group({
      depNameEdit: [this.newName, [Validators.pattern('[a-zA-Z ]*')]]
    });
  }
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
    if (this.newName !== '') {
      this.department.depName = this.newName;
      this.departmentService.modify(this.department.depId, this.department).subscribe(
        data => console.log('done'), error1 => console.log(error1));
    }
    this.dialogRef.close();
  }
  get depName() {
    return this.registerForm.get('depName') as FormControl;
  }
  get depNameEdit() {
    return this.editForm.get('depNameEdit') as FormControl;
  }
  getErrorDepName() { return this.depName.hasError('required') ?
    'Department name required' :
    this.depName.hasError('minlength') ? 'You need to specify at least 3 characters' : 'Department name should contain only characters';

  }
}

