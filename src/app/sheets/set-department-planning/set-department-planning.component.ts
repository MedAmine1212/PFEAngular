import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Post} from '../../models/Post';
import {MatDialog} from '@angular/material/dialog';
import {Department} from '../../models/Department';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {PlanningService} from '../../services/planning/planning.service';
import {Planning} from '../../models/Planning';
import {Schedule} from '../../models/Schedule';
import {DepartmentService} from '../../services/department/department.service';
import {DeleteDialogComponent} from "../../dialogs/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-set-department-planning',
  templateUrl: './set-department-planning.component.html',
  styleUrls: ['./set-department-planning.component.css']
})
export class SetDepartmentPlanningComponent implements OnInit {
  plannings: Post[];
  newSchStartHour: number;
  newSchStartMinutes: number;
  newSchEndMinutes: number;
  newSchPauseStart: number;
  newSchPauseStartMinutes: number;
  newSchPauseEnd: number;
  newSchPauseEndMinutes: number;
  newSchEndHour: number;
  loading: boolean;
  showHideInput: boolean;
  searchText: any;
  desc: string;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public clickedDep: Department,
    private setDepPlan: MatBottomSheetRef<SetDepartmentPlanningComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private themeChanger: ThemeChangerService,
    private planningService: PlanningService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.reloadData();
  }
  reloadData() {
  this.plannings = [];
  this.planningService.list().subscribe(r => {
    if (this.clickedDep.planning != null) {
  for (const pl of r) {
    if (pl.planningId !== this.clickedDep.planning.planningId) {
      this.plannings.push(pl);
    }
    if (r.indexOf(pl) === (r.length - 1)) {
      this.loading = false;
    }
  }
    } else {
      this.plannings = r;
      this.loading = false;
    }
  }, error => {
    this.loading = false;
    console.log(error);
  });
  }


  getTheme() {
    return this.themeChanger.getTheme();
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
  returnSchDesc(sch: Schedule) {
    this.getTime(sch);
    let desc: string;
    desc = ' From: ';
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

  setPlanning(pl: Planning) {
    if (this.clickedDep.planning != null) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '400px',
        height: '380',
        data: [null, 'changeDepPl']
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
      let tempPl: Planning;
      this.planningService.findById(this.clickedDep.planning.planningId).subscribe(r => {
        tempPl = r;
        for (const dep of tempPl.departments) {
          if (dep.depId === this.clickedDep.depId) {
            tempPl.departments.splice(pl.departments.indexOf(dep), 1);
            break;
          }
        }
        this.planningService.modify(tempPl, tempPl.planningId, 2).subscribe(() => {
          this.updatePlanning(pl);
        }, error => console.log(error));
      }, error => console.log(error));
    }
  });
    } else {
      this.updatePlanning(pl);
    }
  }

  updatePlanning(pl: Planning) {
    pl.departments.push(this.clickedDep);
    this.planningService.modify(pl, pl.planningId, 1).subscribe(() => {
      this.setDepPlan.dismiss();
    }, error => console.log(error));
  }
}

