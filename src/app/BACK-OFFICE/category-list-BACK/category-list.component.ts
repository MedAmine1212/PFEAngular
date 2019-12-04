import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../entities/category';

@Component({
  selector: 'app-category-list-back',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListBACKComponent implements OnInit {
  categories: Observable<any>;
  showAddCategory: boolean;
  id: number;
  showModifCategory: boolean;
  showDetails: boolean;
  blurAll: boolean;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.blurAll = false;
    this.showAddCategory = false;
    this.showModifCategory = false;
    this.showDetails = false;
    this.reloadData();
  }
  reloadData() {
    this.categories = this.categoryService.getCategoriesList();
  }
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      console.log(data);
      this.reloadData();
    }, error1 => console.log(error1));
  }
  categoryDetails(id: number) {
    this.reloadData();
    this.id = id;
    this.showDetails = true;
    this.blurAll = true;
  }
  updateCategory(id: number) {
    this.reloadData();
    this.id = id;
    this.showModifCategory = true;
    this.blurAll = true;
  }
  addCategory() {
    this.showAddCategory = true;
    this.blurAll = true;
  }

  closeAdd() {
    this.showDetails = false;
    this.showAddCategory = false;
    this.showModifCategory = false;
    this.blurAll = false;
    this.reloadData();
  }

  closeAddFromAdd($event) {
    if ($event === true) {
      this.closeAdd();
    }
  }
}
