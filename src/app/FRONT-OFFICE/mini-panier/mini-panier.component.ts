import { Component, OnInit } from '@angular/core';
import {style} from '@angular/animations';
import {NavComponent} from '../nav/nav.component';
import {Product} from '../../entities/product';
import * as SecureLS from 'secure-ls';
interface CartProdcut {
  productToAdd: Product;
  qte: number;
}

@Component({
  selector: 'app-mini-panier',
  templateUrl: './mini-panier.component.html',
  styleUrls: ['./mini-panier.component.css']

})
export class MiniPanierComponent implements OnInit {
  private tabRes: CartProdcut[];
  private totalPrice: number;
  private allProductStringRes: string;
  private ls: SecureLS;

  constructor(private navComponent: NavComponent) {
  }

  ngOnInit() {
    this.ls = new SecureLS({encodingType: 'aes'});
    this.totalPrice = 0;
    this.tabRes = this.ls.get('_temp_user_p_key');
   // this.tabRes = JSON.parse(this.allProductStringRes);
    if (this.tabRes.length > 0) {
      for (const f of this.tabRes) {
        this.totalPrice += (f.productToAdd.price * f.qte);
      }
      }
    this.ls.set('_temp_p_u_key', this.totalPrice);
  }
 recup() {
   this.tabRes = this.ls.get('_temp_user_p_key');
   // this.tabRes = JSON.parse(this.allProductStringRes);
   this.totalPrice = 0;
   if (this.tabRes.length > 0) {
     for (const f of this.tabRes) {
       this.totalPrice += (f.productToAdd.price * f.qte);
     }
   }
   this.ls.set('_temp_p_u_key', this.totalPrice);
}

  hide() {

    this.navComponent.hideShowPan(2);
  }

  incr(idProd: number) {
    for (const f of this.tabRes) {
      if (f.productToAdd.idProduct === idProd) {
        f.qte++;
        this.totalPrice += (f.productToAdd.price);
        this.ls.set('_temp_p_u_key', this.totalPrice);
        break; }}
   // this.allProductStringRes = JSON.stringify(this.tabRes);
    this.ls.set('_temp_user_p_key', this.tabRes);
  }

  decr(idProd: number) {
    for (const f of this.tabRes) {
      if (f.productToAdd.idProduct === idProd) {
        f.qte--;
        this.totalPrice -= (f.productToAdd.price);
        this.ls.set('_temp_p_u_key', this.totalPrice);
        if ( f.qte === 0) {
          this.suppProduct(f.productToAdd.idProduct) ;
        }
        break; }}
    // this.allProductStringRes = JSON.stringify(this.tabRes);
    this.ls.set('_temp_user_p_key', this.tabRes);
  }


  suppProduct(idProd: number) {
    this.tabRes = this.ls.get('_temp_user_p_key');
   // this.tabRes = JSON.parse(this.allProductStringRes);
    console.log(this.tabRes) ;
    let i = 0 ;
    for (const f of this.tabRes) {
       if (f.productToAdd.idProduct === idProd) {
       this.tabRes.splice(i, 1);
       break;
       }
       i++ ;
    }
   // this.allProductStringRes = JSON.stringify(this.tabRes);
    this.ls.set('_temp_user_p_key', this.tabRes);
    this.recup();
  }
}

