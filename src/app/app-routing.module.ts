import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RemoteMonotoringComponent} from './remote-monotoring/remote-monotoring.component';

const routes: Routes = [
  {path : '' , component: LoginComponent},
  {path : 'RemoteMonotoring' , component: RemoteMonotoringComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
