import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Router} from '@angular/router';
import {Category} from '../../entities/category';
import {CategoryService} from '../../services/category/category.service';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  @Output() closeAll = new EventEmitter<boolean>();
  category: Category = new Category();
  submitted = false;

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit() {
  }

  newCategory(): void {
    this.submitted = false;
    this.category = new Category();
  }

  save() {
    this.categoryService.createCategory(this.category).subscribe(data => console.log(data), error1 => console.log(error1));
    this.category = new Category();
    this.goToList();
  }

  closeThis() {
    this.submitted = true;
    this.save();
    this.closeAll.emit(true);
  }

  goToList() {
    this.categoryService.getCategoriesList();
    this.router.navigate(['admin/categories']);
  }
}
