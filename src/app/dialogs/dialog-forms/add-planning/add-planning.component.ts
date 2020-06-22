import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Schedule} from '../../../models/Schedule';
import {Planning} from '../../../models/Planning';
import {Observable} from 'rxjs';
import {DialogComponent} from '../../message-dialog/dialog.component';
import {ScheduleService} from '../../../services/schedule/schedule.service';
import {MatStepper} from '@angular/material/stepper';
import {animate, style, transition, trigger} from '@angular/animations';
import {PlanningService} from '../../../services/planning/planning.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../models/User';
import {UserConfigsService} from '../../../services/UserConfigs/user-configs.service';
import {NotificationService} from '../../../services/notification/notification.service';
import {NotificationMessage} from '../../../models/NotificationMessage';

@Component({
  selector: 'app-add-planning',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    ],
  templateUrl: './add-planning.component.html',
  styleUrls: ['./add-planning.component.css']
})
export class AddPlanningComponent implements AfterViewInit {
  dialogComponent: MatDialogRef<DialogComponent>;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  schedules: Schedule[] = [];
  schedule: Schedule = new Schedule();
  planning: Planning = new Planning();
  minDate: Date;
  beginHour: string;
  endHour: string;
  startDate: string;
  endDate: string;
  pauseStartHour: string;
  pauseEndHour: string;
  formGroup3: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  newSch: boolean;
  newSchStartHour: number;
  newSchStartMinutes: number;
  newSchEndMinutes: number;
  newSchPauseStart: number;
  newSchPauseStartMinutes: number;
  newSchPauseEnd: number;
  newSchPauseEndMinutes: number;
  newSchEndHour: number;
  noSch: boolean;
  private user: User;

  constructor(
              private notificationService: NotificationService,
              private userService: UserService,
              private userConfigService: UserConfigsService,
              public dialogRef: MatDialogRef<AddPlanningComponent>,
              @Inject(MAT_DIALOG_DATA) public pl: Planning,
              private planningService: PlanningService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private scheduleService: ScheduleService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    this.minDate = new Date(currentYear , currentMonth, currentDay);
    this.noSch = true;
    if (this.pl !== null) {
      // copying pl to planning
      this.planning = new Planning();
      this.planning.planningId = this.pl.planningId;
      this.planning.planningName = this.pl.planningName;
      this.planning.planningDescription = this.pl.planningDescription;
      this.planning.startDate = this.pl.startDate;
      this.planning.endDate = this.pl.endDate;
      this.planning.schedule = this.pl.schedule;
      this.planning.scheduleDays = this.pl.scheduleDays;
      this.planning.color = this.pl.color;
      this.planning.colorIcon = this.pl.colorIcon;
      this.planning.showPl = this.pl.showPl;
      this.planning.repeatCycle = this.pl.repeatCycle;

      // rest
      this.newSch = false;
      this.schedule = this.planning.schedule;
      this.startDate = this.planning.startDate;
      this.endDate = this.planning.endDate;
    } else {
    this.newSch = false;
    this.schedule.plannings = [];
    this.planning.color = 'btn btn-primary';
    this.planning.colorIcon = 'btn btn-outline-primary';
    this.schedule.pauseTime = false;
    this.planning.scheduleDays = [];
    }
    this.pauseEndHour = '';
    this.pauseStartHour = '';
    this.newSchStartMinutes = 0;
    this.newSchEndMinutes = 0;
    this.newSchPauseStartMinutes = 0;
    this.newSchPauseEndMinutes = 0;
    this.newSchStartHour = 0;
    this.newSchEndHour = 0;
    this.newSchPauseStart = 0;
    this.newSchPauseEnd = 0;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    this.reloadSchedules();
    this.FormGroup();
    this.FormGroup2();
    this.FormGroup3();
    }, 600);
    if (this.pl !== null) {
      setTimeout(() => {
        this.stepper.selectedIndex = 1;
      }, 1000);
    }
  }

// Schedules from dataBase
  reloadSchedules() {
    this.schedules = [];
    this.scheduleService.list().subscribe(r => {
      this.schedules = r;
      if (this.schedules.length === 0) {
        this.newSch = true;
      }
    });
  }

  // CLose dialog
  closeThis() {
    this.dialogRef.close(false);
  }
  // initialise formGroups
  FormGroup() {
    this.formGroup = this.formBuilder.group({
      schName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      repeatCyc: ['', [Validators.required], this.checkRepeatCycle.bind(this)],
    });
  }
  FormGroup2() {
    this.formGroup2 = this.formBuilder.group({
      pauseStartHour: ['', [Validators.required]],
      pauseEndHour: ['', [Validators.required]],
    });
  }
  FormGroup3() {
    this.formGroup3 = this.formBuilder.group({
      beginHour: [this.beginHour, [Validators.required]],
      endHour: [this.endHour, [Validators.required]],
    });
  }
  // add or remove days to planning days
  addRemoveDay(day: string) {
    if (this.planning.scheduleDays.indexOf(day) > -1) {
        this.planning.scheduleDays.splice(this.planning.scheduleDays.indexOf(day), 1);
    } else {
      this.planning.scheduleDays.push(day);
    }
  }
  // set planning color
  choseColor(color: string) {
    this.planning.color = 'btn btn-' + color;
    this.planning.colorIcon = 'btn btn-outline-' + color;
  }
  // update planning
  updatePlanning() {

    this.planning.showPl = true;
    this.planning.startDate = this.startDate;
    this.planning.endDate = this.endDate;
    if (this.newSch) {
        this.setFinalSchedule();
        this.scheduleService.add(this.schedule).subscribe(r => {
          // @ts-ignore
          this.planning.schedule = r;
          this.saveModifiedPlanning();
        }, error => console.log(error));
    } else {
    this.planning.schedule = this.schedule;
    this.saveModifiedPlanning();
    }
  }
  // save planning to database
saveModifiedPlanning() {
  this.pl = this.planning;
  this.planningService.modify(this.planning, this.pl.planningId).subscribe(() => {
    this.dialogComponent = this.dialog.open(DialogComponent, {
      width: '400px',
      data : 'Planning updated successfully ! '
    });
    this.dialogComponent.afterClosed().subscribe(() =>
      this.dialogRef.close(true)
    );
  }, error1 => console.log(error1));

}
 // newSch false.
  updateExistingSchedule() {
    this.schedule.plannings.push(this.planning);
    this.scheduleService.modify(this.schedule, this.schedule.scheduleId).subscribe(() => {
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '400px',
        data : 'Planning added successfully ! '
      });
      this.dialogComponent.afterClosed().subscribe(() =>
        this.dialogRef.close(true)
      );
    }, error1 => console.log(error1));
  }

  // newSch true
  sendNewSchedule() {
    this.schedule.plannings.push(this.planning);
    this.scheduleService.add(this.schedule).subscribe(sch => {
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '400px',
        data : 'Planning added successfully ! '
      });
      this.dialogComponent.afterClosed().subscribe(() =>
        this.dialogRef.close(true)
      );
    }, error1 => console.log(error1));
  }


  // set this.schedule
  setFinalSchedule() {
    this.schedule.plannings = [];
    this.schedule.startHour = (Number.parseInt(this.beginHour, 0) * 60) +
      Number.parseInt(this.beginHour.slice(3, this.beginHour.length), 0);
    this.schedule.endHour = (Number.parseInt(this.endHour, 0) * 60) +
      Number.parseInt(this.endHour.slice(3, this.endHour.length), 0);
    this.schedule.pauseStart = (Number.parseInt(this.pauseStartHour, 0) * 60) +
      Number.parseInt(this.pauseStartHour.slice(3, this.pauseStartHour.length), 0);
    this.schedule.pauseEnd = (Number.parseInt(this.pauseEndHour, 0) * 60) +
      Number.parseInt(this.pauseEndHour.slice(3, this.pauseEndHour.length), 0);
  }

  // returne schedule time for Modif
  private getTime(sch) {
    this.newSchStartHour = Math.floor(sch.startHour / 60);
    this.newSchStartMinutes = sch.startHour % 60;
    this.newSchEndHour = Math.floor(sch.endHour / 60);
    this.newSchEndMinutes = sch.endHour % 60;
    if (sch.pauseTime) {
      this.newSchPauseStart = Math.floor(sch.pauseStart / 60);
      this.newSchPauseStartMinutes = sch.pauseStart % 60;
      this.newSchPauseEnd = Math.floor(sch.pauseEnd / 60);
      this.newSchPauseEndMinutes = sch.pauseEnd % 60;
    }
  }
  // add new planning
  addPlanning() {
    this.planning.showPl = true;
    this.planning.startDate = this.startDate;
    this.planning.endDate = this.endDate;
    this.userService.findUserWithToken().subscribe(user => {
      // @ts-ignore
      this.user = user;
      this.user.userConfigs[0].shownPlannings.push(this.planning.planningId);
      // @ts-ignore
      this.userConfigService.update(this.user.userConfigs[0].configId, this.user.userConfigs[0].configId).subscribe( () => {
      }, error => console.log(error));
    }, error => console.log(error));

    if (this.newSch) {
      this.setFinalSchedule();
      this.sendNewSchedule();
    } else {
      this.updateExistingSchedule();
    }

  }
  // check repeatCycle input
  checkRepeatCycle(control) {
    return new Observable(observer => {
        const result = (control.value < 1) ? { invalidRepeatCycle: true } : null;
        observer.next(result);
        observer.complete();
    });
  }

  // change form from/to newSch
  isNewSch() {
    if (this.schedules.length > 0 ) {
      this.newSch = !this.newSch;
    }
    if (this.newSch) {
      this.schedule.plannings = [];
      this.schedule.pauseTime = false;
      this.schedule = new Schedule();
    } else if (this.pl !== null && !this.newSch) {
      this.schedule = this.pl.schedule;
    }
  }


  // schedule ToString
  returnSchDesc(sch: Schedule) {
    this.getTime(sch);
    let desc: string;
    desc = 'Schedule id: ' + sch.scheduleId + ', From: ';
    if (this.newSchStartHour < 10) {
      desc = desc + '0';
    }
    desc = desc + this.newSchStartHour + ':';
    if (this.newSchStartMinutes < 10) {
      desc = desc + '0';
    }
    desc = desc + this.newSchStartMinutes + ', To: ';

    if (this.newSchEndHour < 10) {
      desc = desc + '0';
    }
    desc = desc + this.newSchEndHour + ':';
    if (this.newSchEndMinutes < 10) {
      desc = desc + '0';
    }
    desc = desc + this.newSchEndMinutes;

    if (!sch.pauseTime) {
      desc = desc + ' , No pause time.';
    } else {
        // pause time

      desc = desc + ' , Pause time From: ';
      if (this.newSchPauseStart < 10) {
        desc = desc + '0';
      }
      desc = desc + this.newSchPauseStart + ':';
      if (this.newSchPauseStartMinutes < 10) {
        desc = desc + '0';
      }
      desc = desc + this.newSchPauseStartMinutes + ', To: ';

      if (this.newSchPauseEnd < 10) {
        desc = desc + '0';
      }
      desc = desc + this.newSchPauseEnd + ':';
      if (this.newSchPauseEndMinutes < 10) {
        desc = desc + '0';
      }
      desc = desc + this.newSchPauseEndMinutes;
    }
    return desc;
  }
  // schedule select
  setSchedule(e) {
    for (const sch of this.schedules) {
      if (sch.scheduleId === Number.parseInt(e.target.value, 0)) {
          this.schedule = sch;
          this.noSch = false;
          console.log(this.schedule);
          break;
      }
    }
  }
}
