import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import * as SecureLS from 'secure-ls';
import {Product} from '../../entities/product';
import {NavComponent} from '../nav/nav.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from "../../services/auth/authentication.service";
interface CartProdcut {
  productToAdd: Product;
  qte: number;
}
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
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
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
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
        break; }}
    this.ls.set('_temp_user_p_key', this.tabRes);
  }

  decr(idProd: number) {
    for (const f of this.tabRes) {
      if (f.productToAdd.idProduct === idProd) {
        f.qte--;
        this.totalPrice -= (f.productToAdd.price);
        if ( f.qte === 0) {
          this.suppProduct(f.productToAdd.idProduct) ;
        }
        break; }}
    this.ls.set('_temp_user_p_key', this.tabRes);
  }

  suppProduct(idProd: number) {
    this.tabRes = this.ls.get('_temp_user_p_key');
    console.log(this.tabRes) ;
    let i = 0 ;
    for (const f of this.tabRes) {
      if (f.productToAdd.idProduct === idProd) {
        this.tabRes.splice(i, 1);
        break;
      }
      i++ ;
    }
    this.ls.set('_temp_user_p_key', this.tabRes);
    if (this.tabRes.length <= 0) {
      this.emptyTab = true;
    }
  }

  checkIfLoggedIn() {

    // test ken logged in or not
    if (!this.auth.isAuthentified()) {
      this.showLogIns = true;
    } else {
      this.showValidateCom = true;
    }
  }
  closeLogIns() {
    this.showLogIns = false;
  }
}

