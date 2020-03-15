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
  department: Department = new Department();
  constructor(public dialogRef: MatDialogRef<AddDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Department,
              private formBuilder: FormBuilder, private departmentService: DepartmentService ) { }

  ngOnInit(): void {
    this.dep = this.data;
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
    console.log(this.department);
    this.departmentService.add(this.department).subscribe(data => console.log(data), error1 => console.log(error1));
    this.dialogRef.close();
  }

}

