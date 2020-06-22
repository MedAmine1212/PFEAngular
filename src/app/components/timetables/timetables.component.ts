import {Component, OnInit, ViewChild} from '@angular/core';
import {Schedule} from '../../models/Schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {AddPlanningComponent} from '../../dialogs/dialog-forms/add-planning/add-planning.component';
import {MatDialog} from '@angular/material/dialog';
import {PlanningService} from '../../services/planning/planning.service';
import {Planning} from '../../models/Planning';
import {PlanningDetailsComponent} from '../planning-details/planning-details.component';
import {UserService} from '../../services/user/user.service';
import {UserConfigs} from '../../models/UserConfigs';
import {UserConfigsService} from '../../services/UserConfigs/user-configs.service';
import {User} from '../../models/User';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {SchedulesComponent} from '../schedules/schedules.component';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-timetables',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('600ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('0ms', style({opacity: 0}))
        ])
      ]
    ),
    ],
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],

})
export class TimetablesComponent implements OnInit {

  @ViewChild(PlanningDetailsComponent) planningDetailsComp: PlanningDetailsComponent;
  @ViewChild(SchedulesComponent) schComp: SchedulesComponent;
  userConfig: UserConfigs = new UserConfigs();
  hours: number[];
  days: string[];
  searchText;
  pauseStartMinutes: number;
  pauseEndMinutes: number;
  startMinutes: number;
  endMinutes: number;
  showHideInput: boolean;
  plannings: Planning[] = [];
  time = new Date();
  showSch: boolean;
  showPause: boolean;
  selectedCount: number;
  desc: string;
  startHour: number;
  endHour: number;
  pauseStart: number;
  pauseEnd: number;
  menuTop: string;
  showTable: boolean;
  clickedPlanning: Planning;
  user: User = null;
   selectedPlanning: boolean;
  constructor(
    private themeChanger: ThemeChangerService,
    private userService: UserService,
    private userConfigService: UserConfigsService,
    public dialog: MatDialog, private  scheduleService: ScheduleService, private  planningService: PlanningService) {
    this.clickedPlanning = null;
    this.hours = Array(24).fill(6).map((x, i) => i);
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.startMinutes = 0;
    this.endMinutes = 0;
    this.pauseStartMinutes = 0;
    this.pauseEndMinutes = 0;
    this.startHour = 0;
    this.endHour = 0;
    this.pauseStart = 0;
    this.pauseEnd = 0;
    this.menuTop = '0';
  }

  ngOnInit(): void {
    this.selectedPlanning = false;
    this.userConfig.shownPlannings = [];
    this.showTable = false;
    this.selectedCount = 0;
    this.showHideInput = false;
    this.showPause = false;
    this.showSch = false;
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.reloadData();

  }

  setCliked(pl: Planning, day: string, hour: number) {
    // click planning span
  }

  checkSch(pl: Planning, day: string, hour: number) {
    this.showPause = false;
    this.showSch = false;
    this.getTime(pl);
    if (pl.showPl) {
      if ( pl.scheduleDays.indexOf(day) > -1 && this.startHour <= hour && this.endHour >= hour) {
        this.showSch = true;
      }
      if (pl.schedule.pauseTime) {
        if (this.pauseStart <= hour && this.pauseEnd > hour) {
          this.showSch = false;
          if (pl.scheduleDays.indexOf(day) > -1) {
            this.showPause = true;
          }
        }
      }
    }
  }

  showTip(hour: number, pl: Planning) {
    let h: string;
    h = hour.toString();
    if (hour < 10) {
      h = '0' + h;
    }
    h = h + ':';
    this.getTime(pl);
    if ( this.startHour === hour && this.startMinutes > 0) {
      if (this.startMinutes < 10) {
        h = h + '0';
      }
      h = h + this.startMinutes.toString();
    } else if (this.endHour === hour && this.endMinutes > 0) {
      if (this.endHour < 10) {
        h = h + '0';
      }
      h = h + this.endMinutes.toString();
    } else {
    h = h + ':00';
    }
    return h;
  }

  showAll() {
    this.selectedCount = this.plannings.length;
    this.userConfig.shownPlannings = [];
    for (const pl of this.plannings) {
      this.userConfig.shownPlannings.push(pl.planningId);
      if (!pl.showPl) {
        pl.showPl = true;
      }
    }
    this.userConfigService.update(this.userConfig.configId, this.userConfig, 1).subscribe(() => {
    }, error => console.log(error));
  }


  hideAll() {
    this.userConfig.shownPlannings = [];
    this.selectedCount = 0;
    for (const pl of this.plannings) {
      if (pl.showPl) {
        pl.showPl = false;
      }
    }
    this.userConfigService.update(this.userConfig.configId, this.userConfig, 1).subscribe(() => {
    }, error => console.log(error));
  }

  showHideSch(pl: Planning) {
    if (this.showTable) {
    pl.showPl = !pl.showPl;
    if (pl.showPl) {
      this.selectedCount++;
      this.userConfig.shownPlannings.push(pl.planningId);
    } else {
      this.userConfig.shownPlannings.splice(this.userConfig.shownPlannings.indexOf(pl.planningId), 1);
      this.selectedCount--;
    }
    this.userConfigService.update(this.userConfig.configId, this.userConfig, 1).subscribe( () => {
    }, error => console.log(error));
    }
  }

  addPlanning() {
    const dialogRef = this.dialog.open(AddPlanningComponent, {
      width: '800px',
      height: '620px',
      data: null
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.reloadData();
      }
    });
  }

   reloadData() {
    this.userService.findUserWithToken().subscribe(user => {
      // @ts-ignore
      this.user = user;
      this.userConfig = this.user.userConfigs[0];
      this.listPlannings();
    }, error => {
      setTimeout(() => {
        this.showTable = true;
      }, 500);
      console.log(error);
    });
    }
  listPlannings() {
    this.planningService.list().subscribe(list => {
      this.plannings = list;
      this.selectedCount = 0;
      let changed: boolean;
      changed = false;
      if (this.planningDetailsComp != null) {
      this.planningDetailsComp.setClickedPl(null);
      }

      if (this.schComp != null) {
        this.schComp.setClickedPl(new Planning());
      }
      for (const pl of this.plannings) {
        pl.showPl = this.getShowPl(pl);
        if (this.clickedPlanning != null) {
          if (pl.planningId === this.clickedPlanning.planningId) {
            changed = true;
            this.setClickedPl(pl);
          }
        }
      }
      if (!changed) {
        this.clickedPlanning = null;
      }
      setTimeout(() => {
        this.showTable = true;
      }, 500);
    }, error => {
      console.log(error);
      setTimeout(() => {
        this.showTable = true;
      }, 500);
    });
  }
  getShowPl(pl: Planning) {
    if (this.userConfig != null) {
    for (const plId of this.userConfig.shownPlannings) {
        if (plId === pl.planningId) {
           this.selectedCount ++;
           return true;
        }
    }
    }
    return false;
}
  planningDaysDesc(pl: Planning) {
    this.desc = '[';
    for (const day of pl.scheduleDays) {
      this.desc = this.desc + day.slice(0, 2);
      if (pl.scheduleDays.indexOf(day) < (pl.scheduleDays.length - 1)) {
        this.desc = this.desc + ',';
      }
    }
    this.desc = this.desc + ']';
    return this.desc;
  }

  returnWidth(minutes) {
    return Math.floor((minutes * 100 ) / 60 )  + '% !important';
  }

  private getTime(pl) {
    this.startHour = Math.floor(pl.schedule.startHour / 60);
    this.startMinutes = pl.schedule.startHour % 60;
    this.endHour = Math.floor(pl.schedule.endHour / 60);
    this.endMinutes = pl.schedule.endHour % 60;
    this.pauseStart = Math.floor(pl.schedule.pauseStart / 60);
    this.pauseStartMinutes = pl.schedule.pauseStart % 60;
    this.pauseEnd = Math.floor(pl.schedule.pauseEnd / 60);
    this.pauseEndMinutes = pl.schedule.pauseEnd % 60;
  }
  openDeletePlanDialog() {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '400px',
        height: '380',
        data: [this.clickedPlanning, 'planning']
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.planningService.remove(this.clickedPlanning, this.clickedPlanning.planningId).subscribe(() => {
            this.clickedPlanning = null;
            this.schComp.setClickedPl(new Planning());
            this.planningDetailsComp.setClickedPl(null);
            this.reloadData();
          }, error1 => console.log(error1));
        }

      });
  }

  openDetailsDialog() {
      const dialogRef = this.dialog.open(AddPlanningComponent, {
        width: '900px',
        height: '625px',
        panelClass: 'matDialogClass2',
        data: this.clickedPlanning
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.reloadData();
          this.schComp.reloadData();
        }
       });
  }

  setClickedPl(pl: any) {
    if (this.showTable) {
      // this.selectedPlanning = !this.selectedPlanning;
      this.clickedPlanning = pl;
      this.planningDetailsComp.setClickedPl(pl);
      this.schComp.setClickedPl(pl);
    }
  }
  getTheme() {
    return this.themeChanger.getTheme();
  }

  reloadFromSocket() {
    this.schComp.reloadData();
    this.reloadData();
  }
}
