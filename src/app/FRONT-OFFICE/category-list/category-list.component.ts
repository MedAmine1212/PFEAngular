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

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categoryService.getCategoriesList().subscribe(r => {
      this.categories = r;
      console.log(this.categories);
    });
  }

  categoryDetails(id: number) {
    this.router.navigate(['detailCategory', id]);
  }
}
