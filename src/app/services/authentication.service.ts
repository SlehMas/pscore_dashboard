import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('auth_token')
    this.currentUserSubject.next(null);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}login/`, {
      'username': username,
      'password': password
    })
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        localStorage.setItem('currentUser', JSON.stringify(res.data[0]));
        localStorage.setItem('auth_token', res.token);
        this.currentUserSubject.next(res.data[0]);
        return res.data[0];
      }));
  }

  /*	register(user) {
      return this.http.post<any>(`${environment.apiUrl}/signup/`,
        user
      )
        .pipe(map(_user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(_user.user));
          localStorage.setItem('auth_token', btoa(`${user.email}:${user.password1}`));
          this.currentUserSubject.next(_user);
          return user;
        }));
    }*/
}