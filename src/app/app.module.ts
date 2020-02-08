import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RemoteMonotoringComponent } from './remote-monotoring/remote-monotoring.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { AbsencesComponent } from './absences/absences.component';
import { DepartementsComponent } from './departements/departements.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { TimetablesComponent } from './timetables/timetables.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RemoteMonotoringComponent,
    NavComponent,
    AbsencesComponent,
    DepartementsComponent,
    AdministratorsComponent,
    TimetablesComponent,
    ProfileComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
