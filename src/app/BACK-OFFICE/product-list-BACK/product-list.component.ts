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
  id: number;
  private imgSrc: string;
  private showHideImg: boolean;
  public showAddProduct: boolean;
  blurAll: boolean;
  showModifProduct: boolean;
  showDetails: boolean;
  constructor(private productService: ProductService, private router: Router) {
    this.router.events.subscribe((val) => {this.reloadData(); }); }

  ngOnInit() {
    this.blurAll = false;
    this.showHideImg = false;
    this.imgSrc = '';
    this.showHideImg = false;
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
    this.id = id;
    this.showDetails = true;
    this.blurAll = true;
  }
  updateProduct(id: number) {
    this.id = id;
    this.reloadData();
    this.showModifProduct = true;
    this.blurAll = true;
  }
  addProduct() {
    this.showAddProduct = true;
    this.blurAll = true;
    // this.router.navigate(['admin/addProduct']);
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

  closeAdd() {
  this.showDetails = false;
  this.showAddProduct = false;
  this.showModifProduct = false;
  this.blurAll = false;
  this.reloadData();
  }

  closeAddFromAdd($event) {
    if ($event === true) {
      this.closeAdd();
    }
  }
}
