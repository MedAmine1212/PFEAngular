import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../entities/product';
import {ProductService} from '../../services/product/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  idProduct: number;
  product: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.product = new Product();
    this.idProduct = this.route.snapshot.params.id;
    this.productService.getProductById(this.idProduct).subscribe(data => {
      console.log(data);
      this.product = data;
    }, error => console.log(error));
  }
  goToList() {
    this.router.navigate(['admin/products']);
  }
}
