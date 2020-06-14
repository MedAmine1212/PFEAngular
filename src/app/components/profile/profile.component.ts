import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImageService} from '../../services/image/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private httpClient: HttpClient,
              private imageService: ImageService
  ) { }

  selectedFile: File;
  imgURL: any;

  imageName: any;

  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }


  // onUpload() {
  //   console.log(this.selectedFile);
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  //   this.imageService.uploadImage(uploadImageData)
  //     .subscribe((response) => {
  //         if (response.status === 200) {
  //           this.getImage();
  //         }
  //       }
  //       , error => console.log(error)
  //     );




  // }

  // getImage() {
  //   this.imageService.getImage(this.imageName);
  //
  // }

  ngOnInit(): void {
  }
}
