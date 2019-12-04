import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../entities/category';
import {CategoryService} from '../../services/category/category.service';

@Component({
  selector: 'app-category-details-back',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsBACKComponent implements OnInit {
  id: number;
  category: Category;
  @Output() closeAll = new EventEmitter<boolean>();
  @Input() idCat: number;
  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.category = new Category();
    this.id = this.idCat;
    this.categoryService.getCategory(this.id).subscribe(data => {
      console.log(data);
      this.category = data;
    }, error1 => console.log(error1));
  }
  list() {
    this.router.navigate(['admin/categories']);
  }
}
