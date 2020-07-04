import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Planning} from '../../models/Planning';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {Department} from '../../models/Department';
import {PlanningService} from '../../services/planning/planning.service';
import {GetRoleService} from '../../services/getRole/get-role.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-planning-details',
  animations: [
  trigger(
    'enterAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('0ms', style({opacity: 0}))
      ])
    ]
  ),
],
  templateUrl: './planning-details.component.html',
  styleUrls: ['./planning-details.component.css']
})
export class PlanningDetailsComponent implements OnInit {
  showBody: boolean;
  clickedPlanning: Planning;
  connectedUser: User;
  role: string;

  constructor(
    private roleService: GetRoleService,
    private planningService: PlanningService,
    private themeChanger: ThemeChangerService) {
  }

  ngOnInit(): void {
    this.getRole();
    this.getConnectedUser();
    this.clickedPlanning = null;
    this.showBody = false;

  }

  public setClickedPl(pl: Planning) {
    this.clickedPlanning = pl;
    this.showBody = false;
    setTimeout(() => {
      this.showBody = true;
    }, 1000);
  }

  onlySpace() {
    if (this.clickedPlanning.planningDescription == null) {
      return false;
    } else {
    return (this.clickedPlanning.planningDescription.replace(/\s/g, '').length !== 0);
    }
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  removeDep(dep: Department) {
    this.clickedPlanning.departments.splice(this.clickedPlanning.departments.indexOf(dep), 1);
    this.planningService.modify(this.clickedPlanning, this.clickedPlanning.planningId, 1).subscribe(() => {
    }, error => console.log(error));

  }
  getConnectedUser() {
    if (this.roleService.getConnectedUser() == null) {
      setTimeout(() => {
        this.getConnectedUser();
      }, 500);
    } else {
      this.connectedUser = this.roleService.connectedUser;
    }
  }
  getRole() {
    this.role = this.roleService.userRole();
  }
}
