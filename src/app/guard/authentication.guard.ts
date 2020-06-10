import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router, CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthenticationService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // @ts-ignore
    if (next.component.name === 'LoginComponent'){
      if (this.auth.loggedIn()) {
        this.router.navigate(['/RemoteMonitoring']);
        return false;
      } else {
        return true;
      }
    } else {
      if (!this.auth.loggedIn()) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }


  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
