import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Image} from '../../models/Image';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseurl = environment.ipAddress + environment.port + '/image/';
  private headers: HttpHeaders;
  message: string;


  constructor(private http: HttpClient) { }


  uploadImage(uploadImageData, id) {
    return this.http.post(this.baseurl + 'upload/' + id, uploadImageData, { observe: 'response' });

  }

  load(imageName) {
    return this.http.get(this.baseurl + 'load/' + imageName);

  }
}
