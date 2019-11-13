import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryService} from '../category.service';
import {Router} from '@angular/router';
import {Category} from '../category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories;
  tab: [];
  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categories = this.categoryService.getCategoriesList().subscribe( r => { this.tab = r ; console.log(this.tab)});


  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      console.log(data);
      this.reloadData();
    }, error1 => console.log(error1));
  }

  categoryDetails(id: number) {
    this.router.navigate(['detailCategory', id]);
  }

  updateCategory(id: number) {
    this.reloadData();
    this.router.navigate(['updateCategory', id]);
  }
}
