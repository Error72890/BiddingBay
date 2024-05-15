import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelationsAuctionsService {
  private readonly API_URL = 'http://localhost:3000/relations-auctions';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) {}

  addAuctionRelation(auctionId: number, creatorUserId: number, minStartBid: number) {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    const body = { auctionId, creatorUserId, minStartBid };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getCommentRelationList() {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getAuctionRelationById(relationAuctionId: number) {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${relationAuctionId}`, {
      headers,
    });
  }

  getAuctionRelationByAuctionId(auctionId: number) {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/comment/${auctionId}`, {
      headers,
    });
  }

  getAuctionRelationByUserId(userId: number) {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/user/${userId}`, { headers });
  }

  editCommentRelation(
    relationAuctionId: number,
    auctionId: number, 
    creatorUserId: number, 
    minStartBid: number, 
    bidderUserID: number, 
    currentMaxBid: number
  ) {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    const body = { auctionId, creatorUserId, minStartBid, bidderUserID, currentMaxBid };

    return this.http.put(`${this.API_URL}/edit/${relationAuctionId}`, body, {
      headers,
    });
  }

  deleteCommentRelationByCommentId(commentId: number) {
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/deleteByCommentId/${commentId}`, {
      headers,
    });
  }
}
