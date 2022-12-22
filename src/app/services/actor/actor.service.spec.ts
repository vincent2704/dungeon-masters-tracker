import {TestBed} from '@angular/core/testing';

import {ActorService} from './actor.service';
import {Actor} from "../../models/actors/actor";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BattleParticipantType} from "../../models/actors/battleParticipantType";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

describe('actorService', () => {
  let service: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should unstabilize if knocked down actor is hit", () => {
    // given
    let actor = new Actor('Actor 1', 1);
    let date = new Date();
    actor.modifyHp(-1, date);
    expect(actor.isKnockedDown()).toBeTrue();
    actor.setStabilized(true);

    // when
    actor.modifyHp(-1, date);

    // then
    expect(actor.isStabilized()).toBeFalse();
  });

  it("should properly parse actor from JSON", () => {
    // given
    // const playerCharacterJson = "{ id: 1, name: \"Falimir\", level: 1, maxHp: 11, currentHp: 11, timeOfDeathEpoch: null, resurrectionPenalty: 0, availableHitDice: 1, lastLongRestTime: null }"
    const playerCharacter: PlayerCharacter = {
      id: 1,
      name: 'Falimir',
      level: 1,
      maxHp: 11,
      currentHp: 11,
      timeOfDeathEpoch: undefined,
      conditions: undefined,
      availableHitDice: undefined,
      resurrectionPenalty: 0
    }
    const expectedActor: Actor = new Actor('Falimir', 11, BattleParticipantType.PLAYER_CHARACTER, 11, 1, [], true)
    expectedActor.id = 1
    expectedActor.setResurrectionPenalty(0)
    expectedActor.setTimeOfDeath(undefined);

    // when
    const result = service.fromJson(playerCharacter)

    // then
    expect(result).toEqual(expectedActor)
  });

  // fromJson(data: any): Actor {
  //   let actor = new Actor(data.name, data.maxHp);
  //
  //   actor.id = data.id;
  //   actor.currentHp = data.currentHp;
  //   actor.level = data.level;
  //   actor.type = BattleParticipantType.PLAYER_CHARACTER;
  //
  //   const timeOfDeath = data.timeOfDeathEpoch
  //     ? new Date(data.timeOfDeathEpoch)
  //     : undefined
  //   console.log(`${data.name} timeOfDeath: ${timeOfDeath}`)
  //   actor.setTimeOfDeath(timeOfDeath);
  //   actor.setResurrectionPenalty(data.resurrectionPenalty);
  //
  //   return actor;
  // }

});
