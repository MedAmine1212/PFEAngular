import {Component, ElementRef, ViewChild} from '@angular/core';
import {fader} from './FRONT-OFFICE/animation/route-animation';
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
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;

  prepareRoute(outlet: RouterOutlet) {
    return  outlet && outlet.activatedRouteData;
  }
}
