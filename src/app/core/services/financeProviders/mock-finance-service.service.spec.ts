import { TestBed } from '@angular/core/testing';

import { MockFinanceServiceService } from './mock-finance-service.service';

describe('MockFinanceServiceService', () => {
  let service: MockFinanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockFinanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
