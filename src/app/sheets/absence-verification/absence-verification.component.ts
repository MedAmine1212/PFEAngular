import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AbsenceService} from '../../services/absence/absence.service';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {Absence} from '../../models/Absence';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-absence-verification',
  templateUrl: './absence-verification.component.html',
  styleUrls: ['./absence-verification.component.css']
})
export class AbsenceVerificationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public clickedAbs: Absence,
    private absenceService: AbsenceService,
    private userService: UserService,
    private themeChanger: ThemeChangerService,
    private bottomSheetRef: MatBottomSheetRef<AbsenceVerificationComponent>
  ) { }

  ngOnInit(): void {
  }
  updateAbsence(status: string) {
    // let status = '';
    // if (abs.reasonStatus === 'btn btn-danger') {
    //   status = 'btn btn-success';
    // } else {
    //   status = 'btn btn-danger';
    // }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [status, 'updateAbsence']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.findUserWithToken().subscribe(r => {
          // @ts-ignore
          this.clickedAbs.revisedBy = r.firstName + ' ' + r.name;
          this.clickedAbs.reasonStatus = status;
          this.clickedAbs.user = null;
          console.log(this.clickedAbs);
          this.absenceService.modify(this.clickedAbs, this.clickedAbs.idAbsence).subscribe(() => {
            this.bottomSheetRef.dismiss(true);
          }, error => console.log(error) );
        }, error => console.log(error));
      }
    });
  }
  getTheme() {
    return this.themeChanger.getTheme();
  }
}
