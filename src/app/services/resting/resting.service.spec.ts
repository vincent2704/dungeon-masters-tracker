import {TestBed} from '@angular/core/testing';

import {RestingService} from './resting.service';
import {ActorService} from "../actor/actor.service";
import {TemporalService} from "../temporal/temporal.service";
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {of} from "rxjs";

describe('RestingService', () => {
  let service: RestingService;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let temporalServiceSpy: jasmine.SpyObj<TemporalService>;

  beforeEach(() => {
    const actorSpy = jasmine.createSpyObj('ActorService', ['getPlayerCharacters', 'findActorByName']);
    const temporalSpy = jasmine.createSpyObj('TemporalService', ['addSeconds', 'getCurrentDate', 'getLastLongRestDate', 'setLastLongRestDate']);

    TestBed.configureTestingModule({
      providers: [
        RestingService,
        {provide: ActorService, useValue: actorSpy},
        {provide: TemporalService, useValue: temporalSpy},
      ]
    });

    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    temporalServiceSpy = TestBed.inject(TemporalService) as jasmine.SpyObj<TemporalService>;
    actorServiceSpy.getPlayerCharacters.and.returnValue(of([
      {
        name: 'Actor One',
        maxHp: 10
      } as PlayerCharacter,
      {
        name: 'Actor Two',
        maxHp: 20
      } as PlayerCharacter
    ]));

    service = TestBed.inject(RestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return actor's available Hit Dice", () => {
    //given
    let actor1: PlayerCharacter = {
      name: 'Actor One',
      maxHp: 14,
      currentHp: 5,
      level: 5
    }
    let actor2: PlayerCharacter = {
      name: 'Actor Two',
      maxHp: 14,
      currentHp: 5,
      level: 6
    }
    let actorsToHitDiceMap = new Map<PlayerCharacter, number>([
      [actor1, actor1.level],
      [actor2, actor2.level],
    ])

    service.setActorsToAvailableHitDiceMap(actorsToHitDiceMap)

    //then
    expect(service.getActorsAvailableHitDice(actor1)).toEqual(5);
    expect(service.getActorsAvailableHitDice(actor2)).toEqual(6);
  });

  it("should properly perform short rest", () => {
    // given
    let actor1: PlayerCharacter = {
      name: 'Actor One',
      maxHp: 14,
      currentHp: 5,
      level: 5
    }
    let actor2: PlayerCharacter = {
      name: 'Actor Two',
      maxHp: 14,
      currentHp: 5,
      level: 6
    }

    let actorsToHitDiceMap = new Map<PlayerCharacter, number>([
      [actor1, actor1.level],
      [actor2, actor2.level],
    ])
    service.setActorsToAvailableHitDiceMap(actorsToHitDiceMap)

    // and
    let durationInHours = 2;
    let input = new Map<PlayerCharacter, ShortRestInput>([
      [actor1, new ShortRestInput(3, 5)],
      [actor2, new ShortRestInput(2, 6)]
    ]);

    // when
    service.performShortRest(durationInHours, input);

    // then
    expect(actor1.currentHp).toEqual(10);
    expect(actor2.currentHp).toEqual(11);

    expect(service.getActorsToAvailableHitDiceMap()).toEqual(new Map<PlayerCharacter, number>([
      [actor1, 2],
      [actor2, 4],
    ]));
    expect(temporalServiceSpy.addSeconds).toHaveBeenCalledWith(7200);
  });

  it("should return time passed since last long rest", () => {
    //given
    let restFinishedAt = new Date(1524, 6, 17, 18, 30, 0);
    temporalServiceSpy.getLastLongRestDate.and.returnValue(restFinishedAt)
    // and
    let currentDate = new Date(1524, 6, 17, 23, 30, 0);
    temporalServiceSpy.getCurrentDate.and.returnValue(currentDate);

    //when
    let timePassed = service.getTimeSinceLastLongRest();

    //then
    expect(timePassed).toEqual(5);
  });

  it("should set minimum rest time for party that last time rested 24 hours ago or longer", () => {
    //given
    let restFinishedAt = new Date(1524, 6, 17, 18, 30, 0);
    temporalServiceSpy.getLastLongRestDate.and.returnValue(restFinishedAt)
    // and
    let currentDate = new Date(1524, 6, 18, 23, 30, 0);
    temporalServiceSpy.getCurrentDate.and.returnValue(currentDate);

    //when
    let minimumLongRestTime = service.getMinimumRestingTime();

    //then
    expect(minimumLongRestTime).toEqual(8);
  });

  it("should set minimum rest time for party that last time rested less than 24 hours ago", () => {
    //given
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    temporalServiceSpy.getLastLongRestDate.and.returnValue(restFinishedAt)
    // and
    let currentDate = new Date(1524, 6, 17, 19, 30, 0);
    temporalServiceSpy.getCurrentDate.and.returnValue(currentDate);

    //when
    let minimumLongRestTime = service.getMinimumRestingTime();

    //then
    expect(minimumLongRestTime).toEqual(23);
  });

  it("Long Rest should properly regain Hit Dice and heal non-knocked down actors", () => {
    // given
    let actor1: PlayerCharacter = {
      name: 'Actor One',
      maxHp: 14,
      currentHp: 5,
      level: 6
    }
    let actor2: PlayerCharacter = {
      name: 'Actor Two',
      maxHp: 14,
      currentHp: 5,
      level: 6
    }
    let actor3: PlayerCharacter = {
      name: 'Actor Three',
      maxHp: 14,
      currentHp: 5,
      level: 6
    }
    let actor4: PlayerCharacter = {
      name: 'Actor Four',
      maxHp: 14,
      currentHp: 0,
      level: 6
    }

    let actorsToAvailableHitDice = new Map<PlayerCharacter, number>([
      [actor1, 1],
      [actor2, 6],
      [actor3, 5],
      [actor4, 5],
    ]);
    service.setActorsToAvailableHitDiceMap(actorsToAvailableHitDice);

    // and
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    temporalServiceSpy.getLastLongRestDate.and.returnValue(restFinishedAt);
    let currentDate = new Date(1524, 6, 18, 10, 30, 0);
    temporalServiceSpy.getCurrentDate.and.returnValue(currentDate);

    // and
    // actorServiceSpy.findActorByName.withArgs(actor1.name).and.returnValue(actor1);
    // actorServiceSpy.findActorByName.withArgs(actor2.name).and.returnValue(actor2);
    // actorServiceSpy.findActorByName.withArgs(actor3.name).and.returnValue(actor3);
    // actorServiceSpy.findActorByName.withArgs(actor4.name).and.returnValue(actor4);

    // when
    service.performLongRest(8);

    //then
    expect(actor1.currentHp).toEqual(actor1.maxHp);
    expect(actor2.currentHp).toEqual(actor2.maxHp);
    expect(actor3.currentHp).toEqual(actor3.maxHp);
    expect(actor4.currentHp).toEqual(0);

    expect(service.getActorsToAvailableHitDiceMap()).toEqual(new Map<PlayerCharacter, number>(
      [
        [actor1, 4],
        [actor2, 6],
        [actor3, 6],
        [actor4, 5],
      ]
    ))

    expect(temporalServiceSpy.addSeconds).toHaveBeenCalledWith(28_800);
  });

});
