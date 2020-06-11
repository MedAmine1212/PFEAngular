import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap/';
import {animate, style, transition, trigger} from '@angular/animations';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-50%)', opacity: 0}),
          animate('0.3s', style({transform: 'translateX(0)', opacity: 1}))
        ])
      ]
    ),
    trigger(
      'enterSecondAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-400%)', opacity: 0}),
          animate('0.3s', style({transform: 'translateX(0)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class AbsencesComponent implements OnInit {
  showMotifs: boolean;
  showPoint: boolean;
  showAbsences: boolean;

  constructor(private themeChanger: ThemeChangerService, private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.showMotifs = false;
    this.showAbsences = true;
    this.showPoint = false;
  }

  showHide(x: number) {
    if (x === 1) {
    this.showAbsences = false;
    this.showMotifs = true;
    this.showPoint = false;
    } else if (x === 2) {
      this.showAbsences = false;
      this.showMotifs = false;
      this.showPoint = true;
    } else {
      this.showAbsences = true;
      this.showMotifs = false;
      this.showPoint = false;
    }
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }
}
