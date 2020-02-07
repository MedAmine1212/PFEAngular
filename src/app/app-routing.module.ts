import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RemoteMonotoringComponent} from './remote-monotoring/remote-monotoring.component';
import {AbsencesComponent} from './absences/absences.component';
import {DepartementsComponent} from './departements/departements.component';
import {AdministratorsComponent} from './administrators/administrators.component';
import {TimetablesComponent} from './timetables/timetables.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path : '' , component: LoginComponent},
  {path : 'RemoteMonotoring' , component: RemoteMonotoringComponent,
    children:[
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
        path: 'Departements',
        component: DepartementsComponent,
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
