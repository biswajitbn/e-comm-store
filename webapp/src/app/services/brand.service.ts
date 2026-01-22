import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../types/brand';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/brand');
  }

  getBrandById(id: string) {
    return this.http.get<Brand>(environment.apiUrl + '/brand/' + id);
  }

  // ✅ Updated to accept full object (name + categoryId)
  addBrand(data: { name: string; categoryId: string }) {
    return this.http.post(environment.apiUrl + '/brand', data);
  }

  // ✅ Updated to accept full object (name + categoryId)
  updateBrand(id: string, data: { name: string; categoryId: string }) {
    return this.http.put(environment.apiUrl + '/brand/' + id, data);
  }

  deleteBrandById(id: string) {
    return this.http.delete(environment.apiUrl + '/brand/' + id);
  }
}
