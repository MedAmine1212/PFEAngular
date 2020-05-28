import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Address} from '../../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = 'http://localhost:81/address/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }


  add(address: Address) {
    return this.http.post(this.baseUrl + 'add', address);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.delete(this.baseUrl + 'delete/' + id , {headers: this.headers });
  }

  modify( address: Address , id): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + id   , address);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'localById/'  + id);
  }
}
