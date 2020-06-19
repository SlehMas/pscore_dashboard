import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments () {
    return this.http.get<any>(`${environment.secureApiUrl}comment/`)
    .pipe(map(res => {
      return res;
    }));
  }

  getComment (id) {
    return this.http.get<any>(`${environment.secureApiUrl}comment/${id}`)
    .pipe(map(res => {
      return res[0];
    }));
  }
  updateComment (comment) {
    return this.http.put<any>(`${environment.secureApiUrl}comment`, comment)
    .pipe(map(res => {
      return res;
    }));
  }
  deleteComment (id) {
    return this.http.delete<any>(`${environment.secureApiUrl}comment/${id}`)
    .pipe(map(res => {
      return res;
    }));
  }

  saveComment (comment) {
    return this.http.post<any>(`${environment.secureApiUrl}comment`, comment).pipe(map(res => {
      return res;
    }));
  }
}
