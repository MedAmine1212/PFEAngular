import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Planning} from '../../models/Planning';

@Component({
  selector: 'app-planning-details',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
],
  templateUrl: './planning-details.component.html',
  styleUrls: ['./planning-details.component.css']
})
export class PlanningDetailsComponent implements OnInit {
   showBody: boolean;
   clickedPlanning: Planning ;
  constructor() { }

  ngOnInit(): void {
    this.clickedPlanning = null;
    this.showBody = false;

  }
  public setClickedPl(pl: Planning) {
      this.clickedPlanning = pl;
      this.showBody = false;
      setTimeout ( () => {
        this.showBody = true;
      }, 1000);
  }
}
