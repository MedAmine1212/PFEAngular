import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RemoteMonotoringComponent } from './components/remote-monotoring/remote-monotoring.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { AbsencesComponent } from './components/absences/absences.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { TimetablesComponent } from './components/timetables/timetables.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MotifsAbsencesComponent } from './components/motifs-absences/motifs-absences.component';
import {HttpClientModule} from '@angular/common/http';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RemoteMonotoringComponent,
    NavComponent,
    AbsencesComponent,
    DepartmentsComponent,
    AdministratorsComponent,
    TimetablesComponent,
    ProfileComponent,
    EmployeesComponent,
    MotifsAbsencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDatepickerModule,
    MatDatepickerModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
