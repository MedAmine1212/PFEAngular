import { Component, OnInit } from '@angular/core';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';

@Component({
  selector: 'app-motifs-absences',
  templateUrl: './motifs-absences.component.html',
  styleUrls: ['./motifs-absences.component.css']
})
export class MotifsAbsencesComponent implements OnInit {
  show: boolean;

  constructor(private themeChanger: ThemeChangerService) { }

  ngOnInit(): void {
    this.show = false;
  }

  getTheme() {
    return this.themeChanger.getTheme();;
  }
}
