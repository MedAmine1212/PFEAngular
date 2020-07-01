import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImageService} from '../../services/image/image.service';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() outPutData = new EventEmitter<any>();
  @Input() connectedUser: User;
  retrievedImage: any;
  retrieveResonse: any;
  tempImage: any;
  base64Data: any;
  loading: boolean;
  imageChanged: boolean;
  selectedFile: File;
  imagePath: FileList;
  uploadImageData: FormData;
  imageName: string;
  constructor(
              public router: Router,
              private httpClient: HttpClient,
              private themeChanger: ThemeChangerService,
              private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.reloadUser();
  }

reloadUser() {
  this.retrievedImage = null;
  if (this.connectedUser != null) {
    if (this.connectedUser.image !== '') {
      this.imageService.load(this.connectedUser.image).subscribe(
        img => {
          if (img !== null) {
            this.retrieveResonse = img;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            this.tempImage = 'data:image/jpeg;base64,' + this.base64Data;
          } else {
            this.retrievedImage = null ;
            this.tempImage = null;
          }
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

  removeImage() {
    console.log(this.tempImage);
    if (this.tempImage == null) {
      this.imageChanged = false;
    } else {
      this.imageChanged = true;
    }
    this.retrievedImage = null;
    this.selectedFile = null;
  }

  undoChanges() {
    this.retrievedImage = this.tempImage;
    this.imageChanged = false;
    this.selectedFile = null;
  }

  onSelectFile(files: FileList) {
    if (files.length === 0) {
      return;
    }
    this.imageChanged = true;
    this.retrievedImage = null;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    } else {
      this.selectedFile = files[0] as File;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.retrievedImage = reader.result;
    };
  }

  saveChanges() {
   if (this.selectedFile == null) {
     this.imageService.delete(this.connectedUser.image).subscribe(isDeleted => {
       console.log(isDeleted);
       this.imageChanged = false;
       this.reloadUser();
       this.outPutData.emit(null);
     }, error => console.log(error));
   } else {
     this.uploadImageData = new FormData();
     this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
     this.imageName = this.selectedFile.name;
     this.imageService.uploadImage(this.uploadImageData, this.connectedUser.userId).subscribe((response) => {
         if (response.status !== 200) {
           console.log('Image uploaded error');
         } else {
           this.imageChanged = false;
           this.reloadUser();
           this.outPutData.emit(null);
         }
       }, error => console.log(error));
   }
  }

  refreshConnectedUser(event: User) {
    this.outPutData.emit(event);
  }
}
