import { Component, OnInit } from '@angular/core';
import {RemoteMonitoringComponent} from '../remote-monitoring/remote-monitoring.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {UserConfigs} from '../../models/UserConfigs';
import {UserConfigsService} from '../../services/UserConfigs/user-configs.service';
import {User} from '../../models/User';
import {Image} from '../../models/Image';
import {ImageService} from '../../services/image/image.service';


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
  imageModel ;
   retrievedImage: any;
  constructor(
    private userConfigsService: UserConfigsService,
    private themeChanger: ThemeChangerService,
    private router: Router,
    private auth: AuthenticationService,
    private userService: UserService,
    private imageService: ImageService
  ) {
    this.findUser();
  }


    findUser() {
    this.userService.findUserWithToken().subscribe(res => { // @ts-ignore
      // @ts-ignore
      this.user = res ;
    });

    console.log(this.jwt.getTokenExpirationDate(localStorage.token));
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.loggedIn() ;

    this.userService.findUserWithToken().subscribe(user => {
      // @ts-ignore
      this.imageService.load(user.image).subscribe(

        img => {
          // @ts-ignore
          this.retrieveResonse = img;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

        }
      );
    });


  }

  logout() {
  this.auth.loggedOut();
  this.ngOnInit();
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

}
