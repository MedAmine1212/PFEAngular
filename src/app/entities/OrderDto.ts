import {ProductQteDto} from './ProductQteDto';

export class OrderDto {
  userId: number;
  status: string;
  date: Date;
  products: ProductQteDto[] = [];

  constructor() {
  }
}
