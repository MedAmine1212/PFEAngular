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
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
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
    this.router.navigate(['admin/detailCategory', id]);
  }
  updateCategory(id: number) {
    this.reloadData();
    this.router.navigate(['admin/updateCategory', id]);
  }
  addCategory() {
    this.reloadData();
    this.router.navigate(['admin/addCategory']);
  }
}
