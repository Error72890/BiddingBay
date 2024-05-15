import { TestBed } from '@angular/core/testing';

import { RelationsAuctionsService } from './relations-auctions.service';

describe('RelationsAuctionsService', () => {
  let service: RelationsAuctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationsAuctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
