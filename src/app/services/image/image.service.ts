import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Image} from '../../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseurl = 'http://localhost:81/image/';
  private headers: HttpHeaders;
  message: string;


  constructor(private http: HttpClient) { }


  uploadImage(uploadImageData, id) {
    return this.http.post(this.baseurl + 'upload/' + id , uploadImageData, { observe: 'response' });

  }

  findImageById(id) {
    return this.http.get(this.baseurl + 'get/' + id);

  }

  findByCin(cin) {
    return this.http.get(this.baseurl + 'findByCin/' + cin );
  }

  load(name){
    return this.http.get(this.baseurl + 'load/' + name);
  }
}
