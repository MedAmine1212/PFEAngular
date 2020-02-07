import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remmote-monotoring',
  templateUrl: './remote-monotoring.component.html',
  styleUrls: ['./remote-monotoring.component.css']
})
export class RemoteMonotoringComponent implements OnInit {

  constructor() { }
  time = new Date();

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}
