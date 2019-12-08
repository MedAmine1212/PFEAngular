import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export class Data {
  email: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:81/rest/contact';


  constructor(private http: HttpClient) { }
  sendEmail(message: Data ) {
    console.log('message = ', message);
    return this.http.post(this.baseUrl , message);
  }
}
