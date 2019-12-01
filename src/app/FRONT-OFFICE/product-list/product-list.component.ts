import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Product} from '../../entities/product';
import {Category} from '../../entities/category';
import {ProductService} from '../../services/product/product.service';
import {MiniPanierComponent} from '../mini-panier/mini-panier.component';
import * as SecureLS from 'secure-ls';
interface CartProdcut {
  productToAdd: Product;
  qte: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  category: Category;
  cart: CartProdcut;
  private tabRes: CartProdcut[];
  private test = true;
  private pan: MiniPanierComponent;
  private ls: SecureLS;


  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {

    this.ls = new SecureLS({encodingType: 'aes'});
    this.reloadData();
  }
  reloadData() {
    this.productService.getProducts().subscribe(r => {
      this.products = r;
      console.log(r);
    });
  }

  deleteProduct(idProduct: number) {
    this.productService.deleteProduct(idProduct).subscribe(data => {
      console.log(data);
      this.reloadData();
    }, error => console.log(error));
  }

  productDetails(id: number) {
    this.router.navigate(['detailProduct', id]);
  }

  updateProduct(id: number) {
    this.reloadData();
    this.router.navigate(['updateProduct', id]);
  }

  addToCarta(newProduct: Product) {
    this.tabRes = this.ls.get('_temp_user_p_key');
   // this.tabRes = JSON.parse(this.allProductStringRes);
    console.log(this.tabRes) ;
    // tslint:disable-next-line:triple-equals
    if (this.tabRes == null || this.tabRes == undefined || this.tabRes.length == 0) {
      this.tabRes = [] ;
      this.tabRes.push(this.cart = {productToAdd: newProduct, qte: 1}); console.log('tab jdida ');
    } else if (this.tabRes.length > 0) {
      for (const f of this.tabRes) {
        if (f.productToAdd.idProduct === newProduct.idProduct) {
          f.qte = f.qte + 1;
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
