import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RemoteMonitoringComponent } from './components/remote-monitoring/remote-monitoring.component';
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
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {DialogComponent} from './dialogs/dialog.component';
import {EmployeeDetailsComponent} from './dialogs/employee-details/employee-details.component';
import {MatNativeDateModule} from '@angular/material/core';
import {DeleteUserDialogComponent} from './dialogs/delete-user-dialog/delete-user-dialog.component';
import {CalendarModule} from 'angular-calendar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddPlanningComponent } from './dialogs/dialog-forms/add-planning/add-planning.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DeletePlanningDialogComponent } from './dialogs/delete-planning-dialog/delete-planning-dialog.component';
import {AuthenticationGuard} from "./guard/authentication.guard";
import { SchedulesComponent } from './components/schedules/schedules.component';
import { PlanningDetailsComponent } from './components/planning-details/planning-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RemoteMonitoringComponent,
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
    DialogComponent,
    EmployeeDetailsComponent,
    DeleteUserDialogComponent,
    AddPlanningComponent,
    DeletePlanningDialogComponent,
    SchedulesComponent,
    PlanningDetailsComponent,
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
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    CalendarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule,
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
