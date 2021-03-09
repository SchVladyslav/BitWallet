import { TestBed } from '@angular/core/testing';

import { CoinmarketcupService } from './coinmarketcup.service';

describe('CoinmarketcupService', () => {
  let service: CoinmarketcupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinmarketcupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
