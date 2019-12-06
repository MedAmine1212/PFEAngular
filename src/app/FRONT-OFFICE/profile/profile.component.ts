import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showDetails: boolean;

  constructor() { }

  ngOnInit() {
    this.showDetails = false;
  }

  closeDetailsCom() {
    this.showDetails = false;
  }

  showDetailsCom() {
    this.showDetails = true;
  }

  closeDetailsComEv($event: boolean) {
    if ($event) {
      this.closeDetailsCom();
    }

  }
}
