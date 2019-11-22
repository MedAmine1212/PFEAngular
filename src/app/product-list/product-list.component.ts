import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../entities/product';
import {Category} from '../entities/category';
import {ProductService} from '../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  category: Category;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.productService.getProducts().subscribe(r => {
      this.products = r;
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
}
