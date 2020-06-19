import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  constructor(private http: HttpClient) {
  }

  saveImage (image) {
    const options = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    return this.http.post<any>(`${environment.secureApiUrl}product/image`, image).pipe(map(res => {
      return res;
    }));
  }

  getProducts () {
    return this.http.get<any>(`${environment.secureApiUrl}product/`)
    .pipe(map(res => {
      return res;
    }));
  }

  getProduct (id) {
    return this.http.get<any>(`${environment.secureApiUrl}product/${id}`)
    .pipe(map(res => {
      return res[0];
    }));
  }
  updateProduct (product) {
    return this.http.put<any>(`${environment.secureApiUrl}product`, product)
    .pipe(map(res => {
      return res;
    }));
  }
  deleteProduct (id) {
    return this.http.delete<any>(`${environment.secureApiUrl}product/${id}`)
    .pipe(map(res => {
      return res;
    }));
  }

  saveProduct (product) {
    console.log(product);
    // const options = {
    //   headers: {'Content-Type': 'multipart/form-data'}
    // }
    return this.http.post<any>(`${environment.secureApiUrl}product`, product).pipe(map(res => {
      return res;
    }));
  }
}