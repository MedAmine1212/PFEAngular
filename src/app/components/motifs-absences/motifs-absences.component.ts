import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motifs-absences',
  templateUrl: './motifs-absences.component.html',
  styleUrls: ['./motifs-absences.component.css']
})
export class MotifsAbsencesComponent implements OnInit {
  show: boolean;

  constructor() { }

  ngOnInit(): void {
    this.show = false;
  }

}
