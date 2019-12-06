import {ProductQteDto} from './ProductQteDto';

export class OrderDto {
  userId: number;
  status: string;
  date: Date;
  productDto: ProductQteDto[];
  constructor() {
    this.productDto = [];
  }
}
