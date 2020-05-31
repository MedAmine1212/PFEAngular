import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {Department} from '../../../models/Department';
import {DepartmentService} from '../../../services/department/department.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeleteDepDialogComponent} from '../../delete-dep-dialog/delete-dep-dialog.component';
import {DepartmentsComponent} from '../../../components/departments/departments.component';
import {User} from '../../../models/User';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  registerForm: FormGroup;
  editForm: FormGroup;
  chefDep: User;
  newChefDep: User;
  dep: Department;
  departments: Department[];
  department: Department = new Department();
  public sender: number;
  newName: string;
  disable: boolean;
  constructor(public dialogRef: MatDialogRef<AddDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>,
              private formBuilder: FormBuilder, private departmentService: DepartmentService,
              ) { }

  ngOnInit(): void {
    this.disable = true;
    this.createFormGroup();
    this.createEditFormGroup();
    this.dep =  null;
    this.newChefDep = null;
    this.sender = 1;
    this.newName = '';
    if (this.data != null) {
      this.sender = this.data[1];
      if (this.data[0] != null) {
        this.dep = this.data[0];
        this.departmentService.getChefDep(this.dep.depId).subscribe(user => {
          this.chefDep = user;
        });
      }
    }
    if (this.sender === 2) {
      this.department = this.dep;
    }

    }
  private createFormGroup() {
    this.registerForm = this.formBuilder.group({
      depName: [this.department.depName, [Validators.required, Validators.pattern('[a-zA-Z ]*'),  Validators.minLength(3)]]
    });
  }
  createEditFormGroup() {
    this.editForm = this.formBuilder.group({
      depNameEdit: [this.newName, [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]]
    });
  }
  closeThis() {
    this.dialogRef.close(false);
  }

  addDep() {
    if (this.dep != null) {
      this.department.supDep = this.dep;
    }
    this.departmentService.add(this.department).subscribe(
      data => this.dialogRef.close(true), error1 => console.log(error1));
  }

  updateDep() {
    let update = false;
    if (this.newChefDep != null) {
      this.department.chefDep = this.newChefDep.userId;
      update = true;
    }
    if (this.newName !== '') {
      this.department.depName = this.newName;
      update = true;
    }
    if (update) {
      this.departmentService.modify(this.department.depId, this.department).subscribe(
        data => this.dialogRef.close(true), error1 => console.log(error1));
    }
  }
  get depName() {
    return this.registerForm.get('depName') as FormControl;
  }
  get depNameEdit() {
    return this.editForm.get('depNameEdit') as FormControl;
  }
  getErrorDepName() {
    return this.depName.hasError('required') ?
      'Department name required' :
      this.depName.hasError('minlength') ? 'You need to specify at least 3 characters' : 'Department name should contain only characters';

  }

  enableDisableButt() {
    if (this.newChefDep == null && this.newName === '') {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  disableButt() {
    if (this.newChefDep == null || !this.depNameEdit.valid) {
    this.disable = true;
    }
  }

  enableButt() {
    this.disable = false;
  }
}

