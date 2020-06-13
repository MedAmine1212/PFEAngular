import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Image} from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseurl = 'http://localhost:81/image/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }


}
