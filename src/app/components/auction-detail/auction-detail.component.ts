import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import { UserService } from 'src/app/services/api/user.service';
import { AuctionService } from 'src/app/services/api/auction.service';
import { RelationsAuctionsService } from 'src/app/services/api/relations-auctions.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss'],
  providers: [SessionGuard],
})
export class AuctionDetailComponent implements OnInit {
  auction: any;
  auctionId: number = -1;
  loading: boolean = true;
  error: boolean = false;
  intervalId: any;
  remainingTime: string = '';
  finished: boolean = false;
  imageUrl: string | null = null;

  bidFormItem!: FormGroup;
  bidData: any = {};
  invalidBid = false;

  maxBid = 0;
  minBidRequired = 0;

  bid: any = {
    bidderName: '',
    bidAmt: 0,
  };
  bidders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auctionService: AuctionService,
    private relationsAuctionsService: RelationsAuctionsService
  ) {}

  ngOnInit(): void {
    //Must initialice it
    this.bidFormItem = new FormGroup({
      bidAmt: new FormControl(this.bidData.number, [
        Validators.required,
        Validators.min(1),
        this.multipleOfValueValidator(1),
      ]),
    });

    this.route.paramMap.subscribe((params) => {
      this.auctionId = parseInt(params.get('auctionId') || '0', 10);
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
        },
        error: (error) => {
          this.loading = false;
          this.error = true;
        },
      });

      this.relationsAuctionsService
        .getAuctionRelationsByAuctionId(this.auctionId)
        .subscribe((response) => {
          const relations_auctions = response.relations_auctions;
          relations_auctions.forEach((relation: any) => {
            this.bid.bidderName = '';
            this.bid.bidAmt = 0;
            this.minBidRequired = relation.bidAmt;
            if (relation.isCreator == 0) {
              if (relation.bidAmt > this.minBidRequired) {
                this.maxBid = relation.bidAmt;
                this.minBidRequired = relation.bidAmt;
              }
              this.userService
                .getUserById(relation.userId)
                .subscribe((response2) => {
                  this.bid.bidderName = response2.user.fullName;
                });
              this.bid.bidAmt = relation.bidAmt;

              this.bidders.push(this.bid);
            }
            this.minBidRequired =
              this.auction.minBidIncrement + this.minBidRequired;
            this.bidFormItem = new FormGroup({
              bidAmt: new FormControl(this.bidData.number, [
                Validators.required,
                Validators.min(this.minBidRequired),
                this.multipleOfValueValidator(this.auction.minBidIncrement),
              ]),
            });
          });
        });
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateRemainingTime() {
    this.remainingTime = this.getRemainingTime(this.auction.endDate);
  }

  getRemainingTime(endDate: string) {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds < 0) {
      this.finished = true;
    }
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  createImage() {
    if (this.auction.img && this.auction.img.data) {
      const byteArray = new Uint8Array(this.auction.img.data);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      this.imageUrl = URL.createObjectURL(blob);
    } else console.log('No hay imagen');
  }

  redirectToHome() {
    this.router.navigate(['/']); // Redirige a la página principal
  }

  multipleOfValueValidator(multiple: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value % multiple !== 0) {
        return { notMultipleOfValue: { multiple } };
      }
      return null;
    };
  }

  makeABid() {
    this.bidData.bid = this.bidFormItem.value.bidAmt;
    const userId = parseInt(localStorage.getItem('userId')!);
    this.relationsAuctionsService.addAuctionRelation(this.auctionId, userId, false, this.bidData.bid).subscribe({
        next: (response) => {
          window.location.reload();
        },
      });
  }
}
