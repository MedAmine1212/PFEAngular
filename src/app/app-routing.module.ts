import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { RemoteMonitoringComponent} from './components/remote-monitoring/remote-monitoring.component';
import {AbsencesComponent} from './components/absences/absences.component';
import {DepartmentsComponent} from './components/departments/departments.component';
import {PostsComponent} from './components/posts/posts.component';
import {TimetablesComponent} from './components/timetables/timetables.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {AuthenticationGuard} from './guard/authentication.guard';

const routes: Routes = [
  {path : '' , component: LoginComponent, canActivate : [AuthenticationGuard]
  },
  {path : 'RemoteMonitoring' , component: RemoteMonitoringComponent, canActivate : [AuthenticationGuard],
    children: [
      {
        path: '',
        component: AbsencesComponent,
        outlet: 'mainCon'
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
        path: 'Posts',
        component: PostsComponent,
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
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
