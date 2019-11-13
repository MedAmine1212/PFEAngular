import { Component, OnInit } from '@angular/core';
import {Category} from '../category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  id: number;
  category: Category;
  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.category = new Category();
    this.id = this.route.snapshot.params.id;
    this.categoryService.getCategory(this.id).subscribe(data => {
      console.log(data);
      this.category = data;
    }, error1 => console.log(error1));
  }
  list() {
    this.router.navigate(['categories']);
  }
}
