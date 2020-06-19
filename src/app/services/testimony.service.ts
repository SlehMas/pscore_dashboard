import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TestimonyService {

  constructor(private http: HttpClient) {
  }

  getTestimonys () {
    return this.http.get<any>(`${environment.secureApiUrl}testimony/`)
    .pipe(map(res => {
      return res;
    }));
  }

  getTestimony (id) {
    return this.http.get<any>(`${environment.secureApiUrl}testimony/${id}`)
    .pipe(map(res => {
      return res[0];
    }));
  }
  updateTestimony (Testimony) {
    return this.http.put<any>(`${environment.secureApiUrl}testimony`, Testimony)
    .pipe(map(res => {
      return res;
    }));
  }
  deleteTestimony (id) {
    return this.http.delete<any>(`${environment.secureApiUrl}testimony/${id}`)
    .pipe(map(res => {
      return res;
    }));
  }

  saveTestimony (Testimony) {
    return this.http.post<any>(`${environment.secureApiUrl}testimony`, Testimony).pipe(map(res => {
      return res;
    }));
  }
}
