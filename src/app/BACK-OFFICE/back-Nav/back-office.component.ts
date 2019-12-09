import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BACKOFFICEComponent implements OnInit {
  title = 'VapeOrDie';
  constructor(private rout: Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('token');
    this.rout.navigate(['/']);
  }
}
