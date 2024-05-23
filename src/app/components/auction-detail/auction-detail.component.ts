import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from 'src/app/services/api/auction.service';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss'],
  providers: [SessionGuard]
})
export class AuctionDetailComponent implements OnInit {
  auction: any;
  auctionId: number | null = null;
  loading: boolean = true;
  error: boolean = false;
  intervalId: any;
  remainingTime: string = '';
  imageUrl: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private auctionService: AuctionService) { }

  ngOnInit(): void {    
    this.route.paramMap.subscribe(params => {
      this.auctionId = parseInt(params.get('auctionId') || '0', 10);
      this.getAuctionDetails();
    });
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl); // Limpiar la URL para evitar fugas de memoria
    }
  }
  
  getAuctionDetails() {
    if (!this.auctionId) {
      this.loading = false;
      this.error = true;
      return;
    }
    this.auctionService.getAuctionById(this.auctionId).subscribe({
      next: (response) => {        
        this.auction = response.auction;
        this.loading = false;
        this.updateRemainingTime();
        this.intervalId = setInterval(() => {
          this.updateRemainingTime();
        }, 1000);
        this.createImage();
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
      }
     })
  }

  updateRemainingTime() {
    this.remainingTime = this.getRemainingTime(this.auction.endDate);
  }

  getRemainingTime(endDate: string) {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds < 0){
      return `Finalizada.`
    }
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  createImage() {
    if (this.auction.img && this.auction.img.data) {      
      const byteArray = new Uint8Array(this.auction.img.data);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      this.imageUrl = URL.createObjectURL(blob);
    }
    else console.log("No hay imagen");
    
  }

  redirectToHome() {
    this.router.navigate(['/']); // Redirige a la página principal
  }
}
