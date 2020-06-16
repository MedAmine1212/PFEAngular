import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Image} from '../../models/Image';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseurl = environment.ipAddress + environment.port + '/image/';
  private headers: HttpHeaders;
  message: string;


  constructor(private http: HttpClient) { }


  uploadImage(uploadImageData){
    return this.http.post(this.baseurl + 'upload', uploadImageData, { observe: 'response' });

  }

  getImage(imageName) {
    console.log(imageName);
    return this.http.get(this.baseurl + 'get/' + imageName);

  }
}
