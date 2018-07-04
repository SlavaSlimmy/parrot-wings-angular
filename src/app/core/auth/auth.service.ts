import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(
      'http://193.124.114.46:3001/sessions/create',         
      JSON.stringify({
        email: email,
        password: password
      }), {
        headers: headers
      }
    )
  }

  // getUserInfo(token:string) {
  //   const headers: HttpHeaders = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });    
  //   return this.http.get('http://193.124.114.46:3001/api/protected/user-info', {headers: headers})
  // }
}
