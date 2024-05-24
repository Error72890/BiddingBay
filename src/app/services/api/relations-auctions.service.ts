import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelationsAuctionsService {
  private readonly API_URL = 'http://localhost:3000/relations-auctions';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) {}

  addAuctionRelation(auctionId: number, userId: number, isCreator: boolean, bidAmt: number) {
    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { auctionId, userId, isCreator, bidAmt };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getAuctionRelationList() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getAuctionRelationsById(relationAuctionId: number) : Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${relationAuctionId}`, { headers });
  }

  getAuctionRelationsByAuctionId(auctionId: number) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/auction/${auctionId}`, {
      headers,
    });
  }

  getAuctionRelationsByUserId(userId: number) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/user/${userId}`, { headers });
  }

  editAuctionRelation( relationAuctionId: number, auctionId: number, userId: number, isCreator: boolean, bidAmt: number ) {
    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { relationAuctionId, auctionId, userId, isCreator, bidAmt };

    return this.http.put(`${this.API_URL}/edit/${relationAuctionId}`, body, { headers });
  }

  deleteAuctionRelation(relationId: number) {
    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${relationId}`, { headers });
  }
}
