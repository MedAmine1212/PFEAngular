import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Product} from '../../entities/product';
import {Category} from '../../entities/category';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-product-list-back',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListBACKComponent implements OnInit {
  products: Observable<any>;
  product: Product;
  category: Category;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.product = new Product();
    this.products = this.productService.getProducts();
  }
  deleteProduct(idProduct: number) {
    this.productService.deleteProduct(idProduct).subscribe(data => {
      console.log(data);
      this.reloadData();
    }, error => console.log(error));
  }
  productDetails(id: number) {
    this.router.navigate(['admin/detailProduct', id]);
  }
  updateProduct(id: number) {
    this.reloadData();
    this.router.navigate(['admin/updateProduct', id]);
  }
  addProduct() {
    this.reloadData();
    this.router.navigate(['admin/addProduct']);
  }
}
