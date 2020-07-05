import { Injectable } from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GetRoleService {
  connectedUser: User;
  constructor(
    private userService: UserService) {}

  userRole() {
    if (this.connectedUser != null) {
    if (this.isAdmin()) {
      return 'admin';
    } else if (this.isChefDep()) {
      return 'chefDep';
    } else {
      return 'user';
    }
    }
    return 'admin';
  }
  isAdmin() {
    if (this.connectedUser != null) {
      return this.connectedUser.roles.findIndex(role => role.roleName === 'ADMIN') !== -1;
    }
  }
  isChefDep() {
    if (this.connectedUser != null) {
      return this.connectedUser.roles.findIndex(role => role.roleName === 'CHEF_DEPARTMENT') !== -1;
    }
  }

  getConnectedUser() {
    if (this.connectedUser != null) {
      return this.connectedUser;
    }
  }
  setConnectedUser(user: User) {
    this.connectedUser = user;
    }
}
