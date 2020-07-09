import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {UserConfigs} from '../../models/UserConfigs';
import {UserConfigsService} from '../../services/UserConfigs/user-configs.service';
import {User} from '../../models/User';
import {ImageService} from '../../services/image/image.service';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationMessage} from '../../models/NotificationMessage';
import {Howl} from 'howler';
import {DataBaseExportImportService} from '../../services/dataBaseImportExport/data-base-export-import.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ImportDataBaseComponent} from '../../dialogs/import-data-base/import-data-base.component';
import {HoveredUserService} from '../../services/hoveredUser/hovered-user.service';
import {TempUserService} from '../../services/TempUser/temp-user.service';
import {AddUserComponent} from '../../dialogs/dialog-forms/add-user/add-user.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() connectedUser: User;
  isLoggedIn;
  userConfigs: UserConfigs = new UserConfigs();
  jwt = new JwtHelperService();
  retrieveResonse: any;
  base64Data: any;
  notifs: NotificationMessage[] = [];
  notViewdNotifs: number;

  retrievedImage: any;
  openedNotif: boolean;
  openedMenu: any;
  playNotifSound: boolean;
  notifSound = new Howl({
    src: ['assets\\sounds\\notification.mp3']
  });
  openedDataBaseMenu: boolean;
  selectedFile: File;
  private sqlData: FormData;

  constructor(
    private hoveredUserService: HoveredUserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataBaseExportImportService: DataBaseExportImportService,
    private notifService: NotificationService,
    private userConfigsService: UserConfigsService,
    private themeChanger: ThemeChangerService,
    public router: Router,
    private auth: AuthenticationService,
    private userService: UserService,
    private imageService: ImageService,
    private tempUserService: TempUserService
  ) {
    this.openedMenu = false;
    this.openedNotif = false;
  }

  reloadNotifs() {
    if (this.connectedUser != null) {
      if (this.notifs == null) {
        this.notifs = [];
      }
      let tempNotifs: NotificationMessage[];
      this.userService.findUserWithToken().subscribe(res => {
        // @ts-ignore
        tempNotifs = res.notificationMessages.reverse();

        if (tempNotifs.length > this.notifs.length) {
          if (this.playNotifSound) {
            this.notifSound.play();
          }
          this.notifs = tempNotifs;
          this.notViewdNotifs = null;
          for (const ntf of this.notifs) {
            if (!ntf.isViewed) {
              if (this.notViewdNotifs != null) {
                this.notViewdNotifs++;
              } else {
                this.notViewdNotifs = 1;
              }
            }
          }
        }
        this.playNotifSound = true;
      }, error => console.log(error));
    }
  }

  ngOnInit(): void {
    this.notifs = [];
    this.notViewdNotifs = null;
    this.playNotifSound = false;
    this.reloadNotifs();
    this.isLoggedIn = this.auth.loggedIn();
    this.reloadImage();
  }

  reloadImage() {
    if (this.connectedUser != null) {
      if (this.connectedUser.image !== '') {
        this.imageService.load(this.connectedUser.image).subscribe(
          img => {
            if (img !== null) {
              this.retrieveResonse = img;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            } else {
              this.retrievedImage = null;
            }
          }
        );
      }

    }
  }

  logout() {
    this.auth.loggedOut();
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  setTheme(theme: boolean) {
    this.themeChanger.setTheme(theme);
    this.userConfigs = this.connectedUser.userConfigs[0];
    this.userConfigs.theme = theme;
    this.userConfigsService.update(this.userConfigs.configId, this.userConfigs, 2).subscribe(() => {
    }, error => console.log(error));
  }

  viewAll() {
    this.openedNotif = true;
    if (this.notifs != null) {
      this.notViewdNotifs = null;
      for (const ntf of this.notifs) {
        if (!ntf.isViewed) {
          ntf.isViewed = true;
          this.notifService.modify(ntf, ntf.notifId, 1).subscribe();
        }
      }
    }
  }

  viewOne(ntf: NotificationMessage) {
    if (!ntf.isHovered) {
      ntf.isHovered = true;
      this.notifService.modify(ntf, ntf.notifId, 1).subscribe();
    }
  }

  clearAllNotifications(event) {
    event.stopPropagation();
    this.connectedUser.notificationMessages = [];
    this.notViewdNotifs = null;
    for (const ntf of this.notifs) {
      this.notifService.remove(ntf.notifId).subscribe();
    }
    this.notifs = [];
  }

  deleteNotif(event: MouseEvent, ntf: NotificationMessage) {
    event.stopPropagation();
    this.notifs.splice(this.notifs.indexOf(ntf), 1);
    this.notifService.remove(ntf.notifId).subscribe();
  }

  exportDB() {
    this.dataBaseExportImportService.exportDB(1).subscribe(() => {
      setTimeout(() => {
        const config = new MatSnackBarConfig();
        if (this.themeChanger.getTheme()) {
          config.panelClass = ['snackBar'];
        } else {
          config.panelClass = ['snackBarDark'];
        }
        config.duration = 3000;
        this.snackBar.open('Export successful', null, config);

      }, 500);
    }, error => console.log(error));
  }

  importDB() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [null, 'dataBase']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const dialogRef2 = this.dialog.open(ImportDataBaseComponent, {
          width: '400px',
          height: '380',
          data: [null, 'dataBase']
        });
        dialogRef2.afterClosed().subscribe(result2 => {
          if (result2[0]) {
            if (result2[1] != null) {
              this.selectedFile = result2[1];
              console.log(this.selectedFile);
              setTimeout(() => {
                const config = new MatSnackBarConfig();
                if (this.themeChanger.getTheme()) {
                  config.panelClass = ['snackBar'];
                } else {
                  config.panelClass = ['snackBarDark'];
                }
                let dismissedWithAction = false;
                config.duration = 5000;
                this.snackBar.open('Rebuilding database...', 'Undo ↩', config);
                this.snackBar._openedSnackBarRef.onAction().subscribe(() => {
                  dismissedWithAction = true;
                });
                this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => {
                  if (dismissedWithAction) {
                    config.duration = 3000;
                    setTimeout(() => {
                      this.snackBar.open('Database import canceled', null, config);
                    }, 600);
                  } else {
                    this.dataBaseExportImportService.setDataBaseUpdating(true);
                    this.sqlData = new FormData();
                    this.sqlData.append('sql', this.selectedFile, this.selectedFile.name);
                    this.dataBaseExportImportService.importDB(this.sqlData).subscribe(() => {
                      window.location.reload();
                    }, error => console.log(error));
                  }
                });
              }, 500);
            }
          }
        });
      }
    });
  }

  rollBack() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [null, 'rollback']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataBaseExportImportService.rollBackDB().subscribe(() => {
          this.dataBaseExportImportService.setDataBaseUpdating(true);
          setTimeout(() => {
            const config = new MatSnackBarConfig();
            if (this.themeChanger.getTheme()) {
              config.panelClass = ['snackBar'];
            } else {
              config.panelClass = ['snackBarDark'];
            }
            config.duration = 3000;
            this.snackBar.open('Restoring previous version...', null, config);
            this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => {
              window.location.reload();
            });
          }, 500);
        }, error => console.log(error));
      }
    });
  }

  setClosedSideBarValue() {
    if (this.hoveredUserService.getClosedSideBarValue() === 150) {
      this.hoveredUserService.seClosedSideBarValue(200);
    } else {
      this.hoveredUserService.seClosedSideBarValue(150);
    }
  }

  isAdmin() {
    return this.connectedUser.roles.findIndex(role => role.roleName === 'ADMIN') !== -1;
  }
  isSuperAdmin() {
    return this.connectedUser.roles.findIndex(role => role.roleName === 'SUPER_ADMIN') !== -1;
  }
  isChefDep() {
    return this.connectedUser.roles.findIndex(role => role.roleName === 'CHEF_DEPARTMENT') !== -1;
  }

  verifYUser(ntf: NotificationMessage) {
    if (ntf.idTarget !== 0) {
      this.tempUserService.findById(ntf.idTarget).subscribe(r => {
        const dialogRef = this.dialog.open(AddUserComponent, {
          width: '900px',
          height: '625px',
          panelClass: 'matDialogClass',
          data: [r, 5, 'allDeps']
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result != null) {
            // tslint:disable-next-line:triple-equals
            if (result != false) {
              this.notifService.modify(ntf, ntf.notifId, 2).subscribe(() => {
                  ntf.idTarget = 0;
              }, error => console.log(error));
              this.reloadNotifs();
            }
          }
        });
      }, error => console.log(error));
    } else {
      return;
    }

  }
}
