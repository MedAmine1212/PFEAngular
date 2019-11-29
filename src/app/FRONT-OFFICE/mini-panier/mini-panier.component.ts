import { Component, OnInit } from '@angular/core';
import {style} from '@angular/animations';
import {NavComponent} from '../nav/nav.component';
interface CartProdcut {
  id: number,
  name: string;
  price: number;
  qte: number;
}

@Component({
  selector: 'app-mini-panier',
  templateUrl: './mini-panier.component.html',
  styleUrls: ['./mini-panier.component.css']
})
export class MiniPanierComponent implements OnInit {
  private tabRes: CartProdcut[];
  private allProductStringRes: string;
  private qte: number;

  constructor(private navComponent: NavComponent) {
  }

  ngOnInit() {
    this.qte = 0;
    this.allProductStringRes = localStorage.getItem('panierKey');
    this.tabRes = JSON.parse(this.allProductStringRes);
    console.log(this.tabRes);
  }
recup() {

  this.allProductStringRes = localStorage.getItem('panierKey');
  this.tabRes = JSON.parse(this.allProductStringRes);
  console.log(this.tabRes) ;
}

  hide() {

    this.navComponent.hideShowPan(2);
  }

  incr(idProd: number) {
    for (const f of this.tabRes) {
      if (f.id === idProd) {
        f.qte++;
        this.qte++;
        break; }}
    this.allProductStringRes = JSON.stringify(this.tabRes);
    localStorage.setItem('panierKey', this.allProductStringRes);
  }

  decr(idProd: number) {
    for (const f of this.tabRes) {
      if (f.id === idProd) {
        f.qte--;
        this.qte--;
        if ( f.qte === 0)
        {
          this.suppProduct(f.id) ;
        }
        break; }}
    this.allProductStringRes = JSON.stringify(this.tabRes);
    localStorage.setItem('panierKey', this.allProductStringRes);
  }


  suppProduct(idProd: number) {
    this.allProductStringRes = localStorage.getItem('panierKey');
    this.tabRes = JSON.parse(this.allProductStringRes);
    console.log(this.tabRes) ;
    let i = 0 ;
    for (const f of this.tabRes) {
       if (f.id === idProd) {
       this.tabRes.splice(i, 1);
       break;
       }
       i++ ;
    }
    this.allProductStringRes = JSON.stringify(this.tabRes);
    localStorage.setItem('panierKey', this.allProductStringRes);
  }

}

