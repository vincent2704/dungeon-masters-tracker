import { TestBed } from '@angular/core/testing';

import { RestingService } from './resting.service';

describe('RestingService', () => {
  let service: RestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
