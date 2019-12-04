import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() closeAll = new EventEmitter<boolean>();
  @Input() id: number;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.product = new Product();
    this.idProduct = this.id;
    this.productService.getProductById(this.idProduct).subscribe(data => {
      console.log(data);
      this.product = data;
    }, error => console.log(error));
  }

}
