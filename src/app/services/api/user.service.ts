import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = 'http://localhost:3000/user';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) { }

  registerUser(name: string, email: string, password: string, phoneNumber: string, adress: string) {

    const body = { name, email, password, phoneNumber, adress };

    return this.http.post(`${this.API_URL}/register`, body);
  }

  login(email: string, password: string) {

    const body = { email, password };

    return this.http.post(`${this.API_URL}/login`, body);
  }

  getUsersList() {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getUserById(userId: number) : Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${userId}`, { headers });
  }

  editUser(userId: number, name: string, email: string, password: string, phoneNumber: string, adress: string) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { name, email, password, phoneNumber, adress  };

    return this.http.put(`${this.API_URL}/edit/${userId}`, body, { headers });

  }

  deleteUser(userId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${userId}`, { headers });
  }

}
