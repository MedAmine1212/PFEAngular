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
import { PostsComponent } from './components/posts/posts.component';
import { TimetablesComponent } from './components/timetables/timetables.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HttpClientModule} from '@angular/common/http';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule} from '@angular/material/progress-bar';
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
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {EmployeeDetailsComponent} from './components/employee-details/employee-details.component';
import {MatNativeDateModule} from '@angular/material/core';
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddPlanningComponent } from './dialogs/dialog-forms/add-planning/add-planning.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AuthenticationGuard} from './guard/authentication.guard';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { PlanningDetailsComponent } from './components/planning-details/planning-details.component';
import { AddScheduleComponent } from './dialogs/dialog-forms/add-schedule/add-schedule.component';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AddUsersToPostComponent } from './sheets/add-users-to-post/add-users-to-post.component';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { AddPostComponent } from './dialogs/dialog-forms/add-post/add-post.component';
import { ImportDataBaseComponent } from './dialogs/import-data-base/import-data-base.component';
import { SetDepartmentPlanningComponent } from './sheets/set-department-planning/set-department-planning.component';
import { ChangePasswordComponent } from './dialogs/dialog-forms/change-password/change-password.component';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AbsenceVerificationComponent } from './sheets/absence-verification/absence-verification.component';
import { UpdateAbsenceComponent } from './dialogs/dialog-forms/update-absence/update-absence.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RemoteMonitoringComponent,
    NavComponent,
    AbsencesComponent,
    DepartmentsComponent,
    PostsComponent,
    TimetablesComponent,
    ProfileComponent,
    EmployeesComponent,
    AddUserComponent,
    AddDepartmentComponent,
    DeleteDialogComponent,
    AddPlanningComponent,
    SchedulesComponent,
    PlanningDetailsComponent,
    AddScheduleComponent,
    ProfileComponent,
    AddUsersToPostComponent,
    AddPostComponent,
    EmployeeDetailsComponent,
    ImportDataBaseComponent,
    SetDepartmentPlanningComponent,
    ChangePasswordComponent,
    AttendanceComponent,
    AbsenceVerificationComponent,
    UpdateAbsenceComponent,

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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule,
    MatTableModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    MatPasswordStrengthModule,
    MatChipsModule,
  ],
  providers: [AuthenticationGuard, MatSnackBar, MatBottomSheet],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponent,
    AddDepartmentComponent,
    EmployeeDetailsComponent,
    DeleteDialogComponent,
    AddPlanningComponent,
    PlanningDetailsComponent
  ],
})
export class AppModule { }
