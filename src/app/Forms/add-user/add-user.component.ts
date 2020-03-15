import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Department} from '../../models/Department';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../services/departement/department.service';
import {MatStepper} from '@angular/material/stepper';
import {animate, style, transition, trigger} from '@angular/animations';

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  departments: Department[];
  firstPanelOpenState: boolean;
  secondPanelOpenState: boolean;
  @Output() outPutData = new EventEmitter<boolean>();
  @Input() dep: Department;
  showOtherAddress: boolean;
  constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) { }

  ngAfterViewInit(): void {
    this.showOtherAddress = false;
    this.firstPanelOpenState = true;
    this.secondPanelOpenState = false;
    this.departments = [];
    if (this.dep == null) {
    this.departmentService.list().subscribe(r => {
      this.departments = r;
    });
    } else {
      console.log(this.stepper._steps);
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
    this.outPutData.emit(true);
  }

  addUser() {
  }
}
