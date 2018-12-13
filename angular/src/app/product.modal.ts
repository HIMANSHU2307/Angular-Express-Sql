export class Product {
  public ProductID: number;
  public ProductName: string;
  public ProductDescription: string;

  constructor(id: number, name: string, desc: string) {
    this.ProductID = id;
    this.ProductName = name;
    this.ProductDescription = desc;
  }
}
