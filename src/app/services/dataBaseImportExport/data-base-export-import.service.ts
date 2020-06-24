import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataBaseExportImportService {
  private baseUrl = environment.ipAddress + environment.port + '/db/';
  constructor(private http: HttpClient) { }

  exportDB() {
    return this.http.get(this.baseUrl + 'dumpDb/' + 1);
  }
  // import() {
  //   return this.http.post(this.baseUrl + 'add', department);
  // }
}