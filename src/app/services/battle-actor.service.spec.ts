import { TestBed } from '@angular/core/testing';

import { BattleActorService } from './battle-actor.service';
import {ActorService} from "./actor.service";

describe('BattleActorService', () => {
  let battleActorService: BattleActorService;
  let actorService: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActorService]
    });
    battleActorService = TestBed.inject(BattleActorService);
  });

  it('should be created', () => {
    expect(battleActorService).toBeTruthy();
  });

  it('should reset battle actors', () => {
    actorService = TestBed.inject(ActorService);
    expect(actorService.getProtagonists()).toEqual(['Nathaniel', 'Va', 'Rose', 'Elise']);
  });

});
