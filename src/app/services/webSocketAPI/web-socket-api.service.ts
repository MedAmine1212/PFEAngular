import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WebSocketAPIService {
  private remoteMonitoringCompSource = new Subject<any>();
  // Observable string streams
  remoteMonitoringComp = this.remoteMonitoringCompSource.asObservable();
  webSocketEndPoint = environment.ipAddress + environment.port + '/ws';
  topic = '/topic/greetings';
  stompClient: any;
  constructor() {
  }
  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const thisService = this;
    // tslint:disable-next-line:only-arrow-functions
    thisService.stompClient.connect({}, function(frame) {
      // tslint:disable-next-line:only-arrow-functions
      thisService.stompClient.subscribe(thisService.topic, function(sdkEvent) {
        thisService.onMessageReceived(sdkEvent);
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }
  _send(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
    this.remoteMonitoringCompSource.next(message);
  }


}
