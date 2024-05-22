import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private readonly API_URL = 'http://localhost:3000/Auction';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) { }
  addAuction(name: string, description: string, categories: string, startDate: string, endDate: string, imgID: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { name, description, categories, startDate, endDate, imgID };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getAuctionList() : Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getAuctionsByCategory(category: string): Observable<any> {
      
      const headers = new HttpHeaders({
        'Authorization': this.TOKEN,
      });
  
      return this.http.get(`${this.API_URL}/get-by-category/${category}`, { headers });
   }

  getAuctionById(auctionId: number) : Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${auctionId}`, { headers });
  }

  editAuction(auctionId: number, name: string, description: string, categories: string, startDate: string, endDate: string, imgID: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { name, description, categories, startDate, endDate, imgID };

    return this.http.put(`${this.API_URL}/edit/${auctionId}`, body, { headers });

  }

  deleteAuction(auctionId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${auctionId}`, { headers });
  }

}
