import { Product } from './product.modal';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ServerService {

  // servers: Product;
  constructor(private http: Http) {}


  storeServers(servers) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // this.servers.ProductName = name;
    // this.servers.ProductDescription = desc;
    // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json',
    //   servers,
    //   {headers: headers});
    console.log('dsfs');
    console.log(servers);
    return this.http.post('http://localhost:3000/addproduct',
      servers,
      {headers: headers})
      .map(
        (response: Response) => {
          console.log(response);
          const data = response.json();
          console.log(data);
          console.log(data.recordset);
          return data.recordset;
        }
      );
  }

  getServers() {
    // let tabletojson = require('tabletojson');
    return this.http.get('http://localhost:3000/gettable')
      .map(
        (response: Response) => {
          console.log(response);
          const data = response.json();
          console.log(data);
          console.log(data.recordset);
          return data.recordset;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong')
          ;
        }
      );
  }

  deleteServers(server) {
     return this.http.delete('http://localhost:3000/gettable/' + server)
     .map(
      (response: Response) => {
        console.log(response);
        const data = response.json();
        console.log(data);
        console.log(data.recordset);
        return data.recordset;
      }
    );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-a49fb.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
}
