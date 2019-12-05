import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../entities/category';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  categories: Category[];
  private catId: number;

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit() {
    this.catId = -1;
    this.getProductsById(this.catId);
    console.log(this.catId);
  }
  reloadData() {
    this.categoryService.getCategoriesList().subscribe(r => {
      this.categories = r;
    });
  }
  getProductsById(idCategory: number) {
    this.catId = idCategory;
    this.reloadData();
  }
}
