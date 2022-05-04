import { TestBed } from '@angular/core/testing';

import { TemporalService } from './temporal.service';

describe('TemporalService', () => {
  let service: TemporalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
