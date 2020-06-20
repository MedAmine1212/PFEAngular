import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImageService} from '../../services/image/image.service';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() connectedUser: User;
  retrievedImage: any;
  retrieveResonse: any;
  base64Data: any;
  loading: boolean;
  constructor(private httpClient: HttpClient,
              private themeChanger: ThemeChangerService,
              private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    console.log(this.connectedUser);
    this.retrievedImage = null;
    if (this.connectedUser != null) {
      if (this.connectedUser.image !== '') {
        this.imageService.load(this.connectedUser.image).subscribe(
          img => {
            if (img !== null) {
              this.retrieveResonse = img;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            } else {this.retrievedImage = null ; }
            setTimeout(() => {
              this.loading = false;
            }, 500);
          }, error => {
            setTimeout(() => {
              this.loading = false;
            }, 500);
          }
        );
      } else {
      setTimeout(() => {
        this.loading = false;
      }, 500);
      }
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }


  getTheme() {
    return this.themeChanger.getTheme();
  }
}
