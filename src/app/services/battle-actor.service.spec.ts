import { TestBed } from '@angular/core/testing';

import { BattleActorService } from './battle-actor.service';

describe('BattleActorService', () => {
  let service: BattleActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
