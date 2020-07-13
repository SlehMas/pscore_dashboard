import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders () {
    return this.http.get<any>(`${environment.secureApiUrl}order/`)
    .pipe(map(res => {
      return res;
    }));
  }

  changeOrderStatus (id, status) {
    return this.http.put<any>(`${environment.secureApiUrl}order/`, {
      id_order: id,
      status_order: status
    })
    .pipe(map(res => {
      return res;
    }));
  }
}
