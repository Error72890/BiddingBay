import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from 'src/app/services/api/auction.service';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss'],
  providers: [SessionGuard]

})
export class AuctionListComponent implements OnInit {
  category: string = '';
  itemName: string = '';
  auctions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      const itemName = params.get('itemName');

      if (category !== null) {
        this.category = category;
        this.loadAuctionsByCategory(this.category);
      } else if (itemName !== null) {
        this.itemName = itemName;
        this.loadAuctionsByItemName(this.itemName);
      }      
    });
  }

  loadAuctionsByCategory(category: string) {
    this.auctionService.getAuctionsByCategory(category).subscribe({
      next: (response) => {        
        this.auctions = response.auctions;
      },
      error: (error) => {
        console.error('Error loading auctions', error);
      }
    });    
  }

  loadAuctionsByItemName(itemName: string) {
    this.auctionService.getAuctionList().subscribe({
      next: (response) => {        
        this.auctions = response.auctions;
        this.filterAuctions(itemName);
      },
      error: (error) => {
        console.error('Error loading auctions by item name', error);
      }
    });
  }

  filterAuctions(searchValue: string) {
    this.auctions = this.auctions.filter((auction) =>
      auction.objectName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

}
