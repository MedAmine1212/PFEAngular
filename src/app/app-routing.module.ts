import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { RemoteMonotoringComponent} from './components/remote-monotoring/remote-monotoring.component';
import {AbsencesComponent} from './components/absences/absences.component';
import {DepartmentsComponent} from './components/departments/departments.component';
import {AdministratorsComponent} from './components/administrators/administrators.component';
import {TimetablesComponent} from './components/timetables/timetables.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EmployeesComponent} from './components/employees/employees.component';

const routes: Routes = [
  {path : '' , component: LoginComponent},
  {path : 'RemoteMonotoring' , component: RemoteMonotoringComponent,
    children:[
      {
        path: '',
        component: AbsencesComponent,
        outlet: 'secCon'
      },
      {
        path: 'Absences',
        component: AbsencesComponent,
        outlet: 'mainCon'
      },
      {
        path: 'Employees',
        component: EmployeesComponent,
        outlet: 'mainCon'
      },
      {
        path: 'Departments',
        component: DepartmentsComponent,
        outlet: 'mainCon'
      },
      {
        path: 'Administrators',
        component: AdministratorsComponent,
        outlet: 'mainCon'
      },
      {
        path: 'TimeTables',
        component: TimetablesComponent,
        outlet: 'mainCon'
      },
      {
        path: 'Profile',
        component: ProfileComponent,
        outlet: 'mainCon'
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
