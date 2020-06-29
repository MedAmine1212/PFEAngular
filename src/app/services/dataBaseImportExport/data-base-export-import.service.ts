import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataBaseExportImportService {
  private baseUrl = environment.ipAddress + environment.port + '/db/';
  private updating: boolean;
  constructor(private http: HttpClient) { }

  exportDB() {
    return this.http.get(this.baseUrl + 'dumpDb/' + 1);
  }
  importDB(file) {
    return this.http.post(this.baseUrl + 'restore', file);
  }
  rollBackDB() {
    return this.http.get(this.baseUrl + 'rollback');
  }

  getDataBaseUpdating() {
    return this.updating;
  }
  setDataBaseUpdating(value) {
    this.updating = value;
  }
}

