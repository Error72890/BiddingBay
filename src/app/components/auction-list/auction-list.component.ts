import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from 'src/app/services/api/auction.service';
import { Observable } from 'rxjs';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss'],
  providers: [SessionGuard]

})
export class AuctionListComponent implements OnInit {
  category: string = '';
  auctions: any

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category !== null) {
        this.category = category;
        this.loadAuctions(this.category);
      }      
    });
  }

  loadAuctions(category: string) {
    this.auctionService.getAuctionsByCategory(category).subscribe({
      next: (response) => {        
        this.auctions = response.auctions;
      },
      error: (error) => {
        console.error('Error loading auctions', error);
      }
    });    
  }
}
