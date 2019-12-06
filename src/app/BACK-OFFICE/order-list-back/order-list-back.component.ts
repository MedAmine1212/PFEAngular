import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryService} from '../../services/category/category.service';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';

@Component({
  selector: 'app-order-list-back',
  templateUrl: './order-list-back.component.html',
  styleUrls: ['./order-list-back.component.css']
})
export class OrderListBACKComponent implements OnInit {
  orders: Observable<any>;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.orders = this.orderService.getOrdersList();
  }


  updateOrder(idOrder: number) {
    // this.reloadData();
    // this.router.navigate(['admin/updateCategory', id]);

  }
}
