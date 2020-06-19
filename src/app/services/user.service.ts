import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllApplications () {
    return this.http.get<any>(`${environment.secureApiUrl}applications`)
    .pipe(map(res => {
      return res;
    }));
  }

  assignTeacher (studentId, teacherId) {
    return this.http.post<any>(`${environment.secureApiUrl}user/student/teacher/new`, {studentId, teacherId})
    .pipe(map(res => {
      return res;
    }));
  }

  getTeachersThatAreNotMine (studentId) {
    return this.http.get<any>(`${environment.secureApiUrl}user/student/${studentId}/teacher/new`)
    .pipe(map(res => {
      return res;
    }));
  }
  getStudentsByTeacherId (studentId) {
    return this.http.get<any>(`${environment.secureApiUrl}user/teacher/${studentId}/student`)
    .pipe(map(res => {
      return res;
    }));
  }
  getTeachersByStudentsId (studentId) {
    return this.http.get<any>(`${environment.secureApiUrl}user/student/${studentId}/teacher`)
    .pipe(map(res => {
      return res;
    }));
  }
  getUsers () {
    return this.http.get<any>(`${environment.secureApiUrl}user`)
    .pipe(map(res => {
      return res;
    }));
  }

  getUser (id) {
    return this.http.get<any>(`${environment.secureApiUrl}user/${id}`)
    .pipe(map(res => {
      return res[0];
    }));
  }
  updateUser (User) {
    return this.http.put<any>(`${environment.secureApiUrl}user/${User.id}`, User)
    .pipe(map(res => {
      return res;
    }));
  }
  deleteUser (id) {
    return this.http.delete<any>(`${environment.secureApiUrl}user/${id}`)
    .pipe(map(res => {
      return res;
    }));
  }

  saveUser (User) {
    return this.http.post<any>(`${environment.secureApiUrl}user`, User).pipe(map(res => {
      return res;
    }));
  }
}
