import {Component, OnInit} from '@angular/core';
import {WebSocketAPIService} from './services/webSocketAPI/web-socket-api.service';
import {EmployeesComponent} from './components/employees/employees.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'Remote Monitoring';

  constructor() {
  }
  ngOnInit() {
    // this.webSocketAPI = new WebSocketAPIService(new AppComponent(this.employeeComp));
  }

}
