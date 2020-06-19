import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getArticles () {
    return this.http.get<any>(`${environment.secureApiUrl}article/`)
    .pipe(map(res => {
      return res;
    }));
  }

  getArticle (id) {
    return this.http.get<any>(`${environment.secureApiUrl}article/${id}`)
    .pipe(map(res => {
      return res[0];
    }));
  }
  updateArticle (article) {
    return this.http.put<any>(`${environment.secureApiUrl}article`, article)
    .pipe(map(res => {
      return res;
    }));
  }
  deleteArticle (id) {
    return this.http.delete<any>(`${environment.secureApiUrl}article/${id}`)
    .pipe(map(res => {
      return res;
    }));
  }

  saveArticle (article) {
    return this.http.post<any>(`${environment.secureApiUrl}article`, article).pipe(map(res => {
      return res;
    }));
  }
}
