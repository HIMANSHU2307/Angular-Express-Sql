import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { ServerService } from './server.service';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import { Product } from './product.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverService.getAppName();
  servers: Product[] = [];
  unit: Product[] = [];
  product: Product;
  constructor(private serverService: ServerService) {}
  onAddServer(id: number, name: string, desc: string) {
      this.unit.push({
      ProductID: id,
      ProductName: name,
      ProductDescription: desc,
      // id: this.generateId()
     });
    // console.log(this.unit);
    this.product = this.unit[0];
    this.unit = [];
    // this.unit.ProductName = name;
    // this.unit.ProductDescription = desc;
    console.log(this.product);
  }
  onSave() {
    // console.log(this.unit);
    this.serverService.storeServers(this.product)
      .subscribe(
        (servers: any[]) => this.servers = servers,
        (error) => console.log(error)
      );
  }
  onGet() {
    console.log('on get');
    this.serverService.getServers()
      .subscribe(
        (servers: any[]) => this.servers = servers,
        (error) => console.log(error)
      );
  }

  onDelete(id) {
    console.log('this is ID');
    console.log(id);
    this.serverService.deleteServers(id)
      .subscribe(
        (servers: any[]) => this.servers = servers,
        (error) => console.log(error)
      );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
