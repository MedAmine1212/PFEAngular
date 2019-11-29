import {Category} from './category';

export class Product {
  idProduct: number;
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  Productcategory: Category;

  Product() {}
}
