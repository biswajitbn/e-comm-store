import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { Observable } from 'rxjs';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() {}

  getNewProducts() {
    return this.http.get<Product[]>(environment.apiUrl + "/customer/new-products");
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(environment.apiUrl + "/customer/featured-products");
  }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + "/customer/categories");
  }

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + "/customer/brands");
  }

  getBrandsByCategory(categoryId: string): Observable<Brand[]> {
    const params = new HttpParams().set('categoryId', categoryId);
    return this.http.get<Brand[]>(`${environment.apiUrl}/customer/brands-by-category/${categoryId}`);
  }

  getProducts(
    searchTerm: string,
    categoryId: string,
    sortBy: string,
    sortOrder: string,
    brandId: string,
    page: number,
    pageSize: number
  ): Observable<{ products: Product[]; totalCount: number }> {
    let params = new HttpParams();

    if (searchTerm) params = params.set('searchTerm', searchTerm);
    if (categoryId) params = params.set('categoryId', categoryId);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortOrder) params = params.set('sortOrder', sortOrder);
    if (brandId) params = params.set('brandId', brandId);

    params = params.set('page', page.toString());
    params = params.set('pageSize', pageSize.toString());

    return this.http.get<{ products: Product[]; totalCount: number }>(
      environment.apiUrl + '/customer/products',
      { params }
    );
  }

  // ✅ FIXED: Implemented searchProducts properly
  searchProducts(searchTerm: string): Observable<{ products: Product[]; totalCount: number }> {
    return this.http.get<{ products: Product[]; totalCount: number }>(
      environment.apiUrl + `/customer/products`,
      {
        params: new HttpParams().set('searchTerm', searchTerm),
      }
    );
  }

  // ** Added method to add a new brand **
  addBrand(brand: { name: string }): Observable<Brand> {
    return this.http.post<Brand>(environment.apiUrl + '/customer/brands', brand);
  }
}
