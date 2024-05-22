import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/api/auction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  auctions: any[] = [];
  filterSearch = '';
  filteredAuctions: any[] = [];

  constructor(private auctionService: AuctionService) { 

  }

  ngOnInit(): void {
    this.getAuctions();
  }

  getAuctions() {
    this.auctionService.getAuctionList().subscribe((response) => {
      this.auctions = response.auctions;
      this.filteredAuctions = [...this.auctions]; // mostrar todas las subastas al inicio
    });
  }

  filterAuctions(searchValue: string) {
    this.filteredAuctions = this.auctions.filter((auction) =>
      auction.objectName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}