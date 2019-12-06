import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  private ls: SecureLS;
  constructor(private navComponent: NavComponent) {
  }

  ngOnInit() {
    this.ls = new SecureLS({encodingType: 'aes'});
    this.totalPrice = 0;
    this.tabRes = this.ls.get('_temp_user_p_key');
    if (this.tabRes.length > 0) {
      for (const f of this.tabRes) {
        this.totalPrice += (f.productToAdd.price * f.qte);
      }
      }
  }
 recup() {
   this.tabRes = this.ls.get('_temp_user_p_key');
   this.totalPrice = 0;
   if (this.tabRes.length > 0) {
     for (const f of this.tabRes) {
       this.totalPrice += (f.productToAdd.price * f.qte);
     }
   }
}

  hide() {
    this.navComponent.hideShowPan(2);
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
    this.recup();
  }
}

