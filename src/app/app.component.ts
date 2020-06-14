import {Component, OnInit} from '@angular/core';
import {WebSocketAPIService} from './services/webSocketAPI/web-socket-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'Remote Monitoring';

  webSocketAPI: WebSocketAPIService;
  greeting: any;
  name: string;
  constructor() {
  }
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPIService(new AppComponent());
    setTimeout( () => {
      this.connect();
    }, 5000);
  }

  connect() {
    this.webSocketAPI._connect();
    this.name = '3asba';
    setTimeout( () => {
      this.sendMessage();
    }, 5000);
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
    console.log('F sormek');
  }
}
