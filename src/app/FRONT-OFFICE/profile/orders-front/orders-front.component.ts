import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {OrderService} from '../../../services/order/order.service';
import {User} from '../../../entities/user';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-orders-front',
  templateUrl: './orders-front.component.html',
  styleUrls: ['./orders-front.component.css']
})
export class OrdersFrontComponent implements OnInit {
  private orders: Observable<any>;
  thisPage: string;
  user1: User;
  @Output() closeAll = new EventEmitter<boolean>();
  constructor(private service: OrderService, private auth: AuthenticationService) {
  }

  async ngOnInit() {
    this.thisPage = 'order-font';
    this.user1 = await this.auth.getUser() ;
    this.orders = this.service.getOrderByIdUser(this.user1.idUser);
  }

}
