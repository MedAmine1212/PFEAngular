import { Component } from '@angular/core';
import {fader} from './animation/route-animation';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // slider,
    // bassemAnimation
    fader
  ]
})
export class AppComponent {
  title = 'VapeOrDie';

  prepareRoute(outlet: RouterOutlet) {
    return  outlet && outlet.activatedRouteData;
  }
}
