import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImageService} from '../../services/image.service';
import {Image} from '../../models/Image';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private httpClient: HttpClient, private imageService: ImageService) { }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  image: Image;
  private headers: HttpHeaders;



  ngOnInit(): void {

  }
  // Gets called when the user selects an image
  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }
  // Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);




    // Make a call to the Spring Boot Application to save the image
    // this.imageService.add()
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});

    this.httpClient.post('http://localhost:81/image/upload', uploadImageData, {headers: this.headers})
      .subscribe();
  }
  // Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    // Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
