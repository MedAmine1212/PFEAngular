export class ProductQteDto {
  public id: number;
  public qte: number;
  constructor(private idProduct: number, private qteProduct: number) {
  }
}
