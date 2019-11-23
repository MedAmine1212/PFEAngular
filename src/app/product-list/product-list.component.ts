import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {Category} from '../category';
interface CartProdcut {
  id: number;
  name: string;
  price: number;
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
  private allProductStringRes: string;
  private test = true;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
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

  addToCarta(idProd: number, n: string, p: number) {
    this.allProductStringRes = localStorage.getItem('panierKey');
    this.tabRes = JSON.parse(this.allProductStringRes);
    console.log(this.tabRes) ;
    // tslint:disable-next-line:triple-equals
    if (this.tabRes == null || this.tabRes == undefined || this.tabRes.length == 0) {
      this.tabRes = [] ;
      this.tabRes.push(this.cart = {id: idProd, name: n, price: p, qte: 1}); console.log('tab jdida ');
    } else if (this.tabRes.length > 0) {
      for (const f of this.tabRes) {
        if (f.id === idProd) {
          f.qte = f.qte + 1;
          console.log('zedna quantité khater ' + f.name + ' === ' + n);
          this.test = false;
          break;
        } else { this.test = true ; }}
      if (this.test === true) {
        this.cart = {id: idProd, name: n, price: p, qte: 1};
        this.tabRes.push(this.cart);
        console.log('zedna produit jdid khater ' ); }
    }
    this.allProductStringRes = JSON.stringify(this.tabRes);
    localStorage.setItem('panierKey', this.allProductStringRes);
  }
}
