import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../entities/product';
import {Category} from '../../entities/category';
import {ProductService} from '../../services/product/product.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-supprime-user',
  templateUrl: './supprime-user.component.html',
  styleUrls: ['./supprime-user.component.css']
})
export class SupprimeUserComponent implements OnInit {

  users: Observable<any>;
  id: number;
  constructor(private userService: UserService, private router: Router) {
    this.router.events.subscribe((val) => {this.reloadData(); }); }

  ngOnInit() {
  }
  reloadData() {
    this.users = this.userService.listUsers();
  }
  deleteUser(id: number) {
    this.userService.remove(id).subscribe(data => {
      console.log(data);
      this.reloadData();
    }, error => console.log(error));
  }
}
