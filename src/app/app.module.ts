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
import { AddUserComponent } from './dialogs/dialog-forms/add-user/add-user.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddDepartmentComponent } from './dialogs/dialog-forms/add-department/add-department.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDepDialogComponent } from './dialogs/delete-dep-dialog/delete-dep-dialog.component';

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
    AddUserComponent,
    AddDepartmentComponent,
    DeleteDepDialogComponent,
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
    MatButtonModule,
    BsDropdownModule,
    NgxMatIntlTelInputModule,
    NgxIntlTelInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
