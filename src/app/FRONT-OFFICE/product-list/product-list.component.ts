import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Product} from '../../entities/product';
import {Category} from '../../entities/category';
import {ProductService} from '../../services/product/product.service';
import {MiniPanierComponent} from '../mini-panier/mini-panier.component';
import * as SecureLS from 'secure-ls';
import {UserService} from '../../services/user/user.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {User} from '../../entities/user';
interface CartProdcut {
  productToAdd: Product;
  qte: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() idCat: number;
  products: Product[];
  category: Category;
  cart: CartProdcut;
  nb: number;
  private tabRes: CartProdcut[];
  private test = true;
  private pan: MiniPanierComponent;
  private ls: SecureLS;


  ngOnChanges(changes: SimpleChanges): void {
    this.reloadData();
  }
  constructor(private productService: ProductService, private router: Router ) {
    console.log(this.idCat);
    if (this.idCat !== this.nb) {this.ngOnInit();
    }
  }

 async ngOnInit() {
    this.ls = new SecureLS({encodingType: 'aes'});
    this.reloadData();
  }
  reloadData() {
    if (this.idCat === -1) {
      this.productService.getProducts().subscribe(r => {
        this.products = r;
      });
    } else {
      this.productService.getProductByCategorieId(this.idCat).subscribe(r => {
        this.products = r;
      });
    }
    this.nb = this.idCat;
    console.log(this.idCat);
  }

  addToCarta(newProduct: Product) {
    if (newProduct.quantity > 0) {
    this.tabRes = this.ls.get('_temp_user_p_key');
    if (this.tabRes == null || this.tabRes == undefined || this.tabRes.length === 0) {
      this.tabRes = [] ;
      this.tabRes.push(this.cart = {productToAdd: newProduct, qte: 1}); console.log('tab jdida ');
    } else if (this.tabRes.length > 0) {
      for (const f of this.tabRes) {
        if (f.productToAdd.idProduct === newProduct.idProduct) {
          if (f.qte < f.productToAdd.quantity) {
          f.qte = f.qte + 1;
          }
          this.test = false;
          break;
        } else { this.test = true ; }}
      if (this.test === true) {
        this.cart = {productToAdd: newProduct, qte: 1};
        this.tabRes.push(this.cart);
        console.log('zedna produit jdid khater ' ); }
    }
    // this.allProductStringRes = JSON.stringify(this.tabRes);
    this.ls.set('_temp_user_p_key', this.tabRes);
    // tslint:disable-next-line:no-unused-expression label-position
  }
  }
}
