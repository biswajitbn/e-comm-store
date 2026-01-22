import { HttpClient,HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../types/brand';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  http = inject(HttpClient);


  getAllProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }
  getProductById(id: string){
    return this.http.get<Product>(environment.apiUrl + '/product/'+ id);
  }
  addProduct(model: Product){
    return this.http.post(environment.apiUrl + '/product', model);
  }
  updateProduct(id: string, model: Product){
    return this.http.put(environment.apiUrl + '/product/' + id, model);
  }
// "http://localhost:3000/category/"

  deleteProductById(id: string){
    return this.http.delete(environment.apiUrl + '/product/'+ id);
  }

  searchSuggestions(term: string){
    return this.http.get<string[]>(`${environment.apiUrl}/product/suggestions?term=${term}`);
  }
}
