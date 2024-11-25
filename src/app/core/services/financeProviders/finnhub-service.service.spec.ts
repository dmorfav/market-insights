import { TestBed } from '@angular/core/testing';

import { FinnhubServiceService } from './finnhub-service.service';

describe('FinnhubServiceService', () => {
  let service: FinnhubServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinnhubServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
