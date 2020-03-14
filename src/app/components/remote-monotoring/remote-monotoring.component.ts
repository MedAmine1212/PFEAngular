import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {Department} from '../../models/Department';
import {EmployeesComponent} from '../employees/employees.component';
@Component({
  selector: 'app-remmote-monotoring',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'enterSecondAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './remote-monotoring.component.html',
  styleUrls: ['./remote-monotoring.component.css']
})

export class RemoteMonotoringComponent implements OnInit {
  clickedDeparment: Department;

  constructor(public router: Router) { }
  time = new Date();
  @ViewChild(EmployeesComponent) employeesComponent: EmployeesComponent;
  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  setClickedDep(dep: Department) {
    if (dep) {
      this.clickedDeparment = dep;
      this.employeesComponent.setDepartment(dep);
    }
  }
}
