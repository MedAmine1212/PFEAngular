import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../entities/category';
import {CategoryService} from '../../services/category/category.service';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent  {
  // id: number;
  // category: Category;
  // constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }
  //
  // ngOnInit() {
  //   this.category = new Category();
  //   this.id = this.route.snapshot.params.id;
  //   this.categoryService.getCategory(this.id).subscribe(data => {
  //     console.log(data);
  //     this.category = data;
  //   }, error1 => console.log(error1));
  // }
  // list() {
  //   this.router.navigate(['categories']);
  // }
  products: Observable<any>;
  categories: Observable<any>;
  category: Category;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((val) => {
      this.reloadData(this.route.snapshot.params.id);
    });
  }
  reloadData(id: number) {
    this.products = this.productService.getProductByCategorieId(id);
  }
}
