import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import * as SecureLS from 'secure-ls';
import {Product} from '../../entities/product';
import {NavComponent} from '../nav/nav.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {OrderService} from '../../services/order/order.service';
import {OrderDto} from '../../entities/OrderDto';
import {User} from '../../entities/user';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {ProductQteDto} from '../../entities/ProductQteDto';

interface CartProdcut {
  productToAdd: Product;
  qte: number;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  providers: [DatePipe]
})
export class PanierComponent implements OnInit {
  private user1: User ;
  private logged: boolean;
  private isMobile: boolean;
  private showHideImg: boolean;
  imgSrc: string;
  private tabRes: CartProdcut[];
  private ls: SecureLS;
  private totalPrice: number;
  private emptyTab: boolean;
  private showLogIns: boolean;
  private showValidateCom: boolean;
  private orderDto: OrderDto;
  private i: number;
  private idProductToAdd: number;
  private qteProductToAdd: number;
  private user: Observable<any>;
  logTrue: boolean;
  signTrue: boolean;

  constructor(private auth: AuthenticationService, private orderS: OrderService) {
    this.orderDto = new OrderDto();
  }

  async ngOnInit() {
    this.logTrue = true;
    this.signTrue = false;
    this.i = 0;
    this.showValidateCom = false;
    this.showLogIns = false;
    this.logged = false;
    this.emptyTab = false;
    this.imgSrc = '';
    this.showHideImg = false;
    this.isMobile = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    this.ls = new SecureLS({encodingType: 'aes'});
    this.totalPrice = 0;
    this.tabRes = this.ls.get('_temp_user_p_key');
    if (this.tabRes.length > 0) {
      for (const f of this.tabRes) {
        this.totalPrice += (f.productToAdd.price * f.qte);
      }
    } else {
      this.emptyTab = true;
    }
    this.user1 = await this.auth.getUser() ;
    console.log('thiss is the user ', this.user1);
  }

  showImg(x, src) {
    if (x === 1) {
      this.imgSrc = src;
      console.log('show');
      this.showHideImg = true;
    } else {
      console.log('show');
      this.showHideImg = false;
    }
  }

  incr(idProd: number) {
    for (const f of this.tabRes) {
      if (f.productToAdd.idProduct === idProd) {
        f.qte++;
        this.totalPrice += (f.productToAdd.price);
        break;
      }
    }
    this.ls.set('_temp_user_p_key', this.tabRes);
  }

  decr(idProd: number) {
    for (const f of this.tabRes) {
      if (f.productToAdd.idProduct === idProd) {
        f.qte--;
        this.totalPrice -= (f.productToAdd.price);
        if (f.qte === 0) {
          this.suppProduct(f.productToAdd.idProduct);
        }
        break;
      }
    }
    this.ls.set('_temp_user_p_key', this.tabRes);
  }

  suppProduct(idProd: number) {
    this.tabRes = this.ls.get('_temp_user_p_key');
    console.log(this.tabRes);
    let i = 0;
    for (const f of this.tabRes) {
      if (f.productToAdd.idProduct === idProd) {
        this.tabRes.splice(i, 1);
        break;
      }
      i++;
    }
    this.ls.set('_temp_user_p_key', this.tabRes);
    if (this.tabRes.length <= 0) {
      this.emptyTab = true;
    }
  }


  checkIfLoggedIn() {
// test ken logged in or not
    if (!localStorage.getItem('token')) {
      this.showLogIns = true;
    } else {
      this.showValidateCom = true;
      for (const pr of this.tabRes) {
        this.orderDto.userId = this.user1.idUser;
        this.orderDto.products.push(new ProductQteDto(pr.productToAdd.idProduct, pr.qte));
        this.orderS.createOrder(this.orderDto).subscribe(data => console.log(data), error => console.log(error));
      }
    }
  }

  closeLogIns() {
    this.showLogIns = false;
  }

  closeAddFromAdd($event: boolean) {
    this.closeLogIns();
  }

  change(){
    this.logTrue = !this.logTrue;
    this.signTrue = !this.signTrue;
  }
}
