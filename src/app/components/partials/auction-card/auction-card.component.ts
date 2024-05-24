import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss'],
})
export class AuctionCardComponent implements OnInit, OnDestroy {
  @Input() auction: any;
  remainingTime: string = '';
  progress: number = 0;
  intervalId: any;

  ngOnInit() {
    this.updateRemainingTime();
    this.intervalId = setInterval(() => {
      this.updateRemainingTime();
      this.updateProgress();
    }, 1000);

  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateProgress() {
    this.progress = this.getProgress(this.auction.startDate, this.auction.endDate);    
  }


  getProgress(startDate: string, endDate: string): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const total = end - start;
    const elapsed = now - start;
  
    // Calcula el porcentaje de tiempo transcurrido
    const progressPercentage = (elapsed / total) * 100
  
    return Math.floor(progressPercentage);
  }
  
  //${{auction.currentMaxBid.toLocaleString()}} 

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

}
