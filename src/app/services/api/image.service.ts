import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly API_URL = 'http://localhost:3000/image/upload';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) {}

  saveImage(image: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.API_URL, formData, { headers });
  }
}
