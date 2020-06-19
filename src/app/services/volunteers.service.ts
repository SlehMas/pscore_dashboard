import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VolunteersService {

  constructor(private http: HttpClient) {
  }

  getVolunteers () {
    return this.http.get<any>(`${environment.secureApiUrl}volunteer/`)
    .pipe(map(res => {
      return res;
    }));
  }

  getVolunteer (id) {
    return this.http.get<any>(`${environment.secureApiUrl}volunteer/${id}`)
    .pipe(map(res => {
      return res[0];
    }));
  }
  updateVolunteer (Volunteer) {
    return this.http.put<any>(`${environment.secureApiUrl}volunteer`, Volunteer)
    .pipe(map(res => {
      return res;
    }));
  }
  deleteVolunteer (id) {
    return this.http.delete<any>(`${environment.secureApiUrl}volunteer/${id}`)
    .pipe(map(res => {
      return res;
    }));
  }

  saveVolunteer (Volunteer) {
    return this.http.post<any>(`${environment.secureApiUrl}volunteer`, Volunteer).pipe(map(res => {
      return res;
    }));
  }

}
