import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],

})
export class TimetablesComponent implements OnInit {
  setDate: any;
  startHour = '07:00';
  endHour = '24:00';

  constructor() {
  }

  ngOnInit(): void {
  }
}
