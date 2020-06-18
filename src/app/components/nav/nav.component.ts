import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User = new User();
  isLoggedIn;
  userConfigs: UserConfigs  = new UserConfigs();
  jwt = new JwtHelperService();
  image: any;
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
  constructor(
    private notifService: NotificationService,
    private userConfigsService: UserConfigsService,
    private themeChanger: ThemeChangerService,
    private router: Router,
    private auth: AuthenticationService,
    private userService: UserService,
    private imageService: ImageService
  ) {
    this.openedMenu = false;
    this.openedNotif = false;
  }

  reloadNotifs() {
    this.userService.findUserWithToken().subscribe(user => {
      if (this.notifs == null) {
        this.notifs = [];
      }
      let tempNotifs: NotificationMessage[];
      // @ts-ignore
      tempNotifs = user.notificationMessages.reverse();
      if (tempNotifs.length > this.notifs.length) {
        if (this.playNotifSound) {
          this.notifSound.play();
        }
        this.notifs = tempNotifs;
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

  ngOnInit(): void {
    this.notifs = [];
    this.notViewdNotifs = null;
    this.playNotifSound = false;
    this.reloadNotifs();
    console.log(this.notifs);
    this.isLoggedIn = this.auth.loggedIn() ;

    this.userService.findUserWithToken().subscribe(user => {
      // @ts-ignore
      this.user = user ;
      console.log(user);
      // @ts-ignore
      this.imageService.load(user.image).subscribe(

        img => {
          if(img !== null){
            this.retrieveResonse = img;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          } else {this.retrievedImage = null ; }
        }
      );
    });


  }

  logout() {
  this.auth.loggedOut();
  this.router.navigateByUrl('');
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  setTheme(theme: boolean) {
        this.themeChanger.setTheme(theme);
        this.userConfigs = this.user.userConfigs[0];
        this.userConfigs.theme = theme;
        this.userConfigsService.update(this.userConfigs.configId, this.userConfigs).subscribe(() => {
          console.log('updated');
        }, error => console.log(error));
    }

  viewAll() {
    this.openedNotif = true;
    if (this.notifs != null) {
    this.notViewdNotifs = null;
    for (const ntf of this.notifs) {
      if (!ntf.isViewed) {
      ntf.isViewed = true;
      this.notifService.modify(ntf, ntf.notifId).subscribe();
      }
    }
    }
  }

  viewOne(ntf: NotificationMessage) {
    if (!ntf.isHovered) {
      ntf.isHovered = true;
      this.notifService.modify(ntf, ntf.notifId).subscribe();
    }
  }

  clearAllNotifications(event) {
    event.stopPropagation();
    this.user.notificationMessages = [];
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
}
