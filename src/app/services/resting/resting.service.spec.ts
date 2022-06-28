import {TestBed} from '@angular/core/testing';

import {RestingService} from './resting.service';
import {ActorService} from "../actor/actor.service";
import {TemporalService} from "../temporal/temporal.service";
import {Actor} from "../../models/actor";
import {ShortRestInput} from "../../models/resting/shortRestInput";

describe('RestingService', () => {
  let service: RestingService;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let temporalServiceSpy: jasmine.SpyObj<TemporalService>;

  beforeEach(() => {
    const actorSpy = jasmine.createSpyObj('ActorService', ['getActors', 'findActorByName']);
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
    actorServiceSpy.getActors.and.returnValue([
      new Actor('Actor One', 10),
      new Actor('Actor Two', 20),
    ]);

    service = TestBed.inject(RestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return actor's available Hit Dice", () => {
    //given
    let actor1 = new Actor('Actor One', 14, 5, 1, 5);
    let actor2 = new Actor('Actor Two', 14, 5, 1, 6);
    let actorsToHitDiceMap = new Map<string, number>([
      [actor1.name, actor1.level],
      [actor2.name, actor2.level],
    ])

    service.setActorsToAvailableHitDiceMap(actorsToHitDiceMap)

    //then
    expect(service.getActorsAvailableHitDice(actor1)).toEqual(5);
    expect(service.getActorsAvailableHitDice(actor2)).toEqual(6);
  });

  it("should properly perform short rest", () => {
    // given
    let actor1 = new Actor('Actor One', 14, 5, 1, 5);
    let actor2 = new Actor('Actor Two', 14, 5, 1, 6);

    let actorsToHitDiceMap = new Map<string, number>([
      [actor1.name, actor1.level],
      [actor2.name, actor2.level],
    ])
    service.setActorsToAvailableHitDiceMap(actorsToHitDiceMap)

    // and
    let durationInHours = 2;
    let input = new Map<Actor, ShortRestInput>([
      [actor1, new ShortRestInput(3, 5)],
      [actor2, new ShortRestInput(2, 6)]
    ]);

    // when
    service.performShortRest(durationInHours, input);

    // then
    expect(actor1.getCurrentHP()).toEqual(10);
    expect(actor2.getCurrentHP()).toEqual(11);

    expect(service.getActorsToAvailableHitDiceMap()).toEqual(new Map<string, number>([
      [actor1.name, 2],
      [actor2.name, 4],
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
    let actor1 = new Actor('Actor One', 14, 5, 1, 6);
    let actor2 = new Actor('Actor Two', 14, 5, 1, 6);
    let actor3 = new Actor('Actor Three', 14, 5, 1, 6);
    let actor4 = new Actor('Actor Four', 14, 0, 1, 6);
    actor4.setKnockedDown(true);

    let actorsToAvailableHitDice = new Map<string, number>([
      [actor1.name, 1],
      [actor2.name, 6],
      [actor3.name, 5],
      [actor4.name, 5],
    ]);
    service.setActorsToAvailableHitDiceMap(actorsToAvailableHitDice);

    // and
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    temporalServiceSpy.getLastLongRestDate.and.returnValue(restFinishedAt);
    let currentDate = new Date(1524, 6, 18, 10, 30, 0);
    temporalServiceSpy.getCurrentDate.and.returnValue(currentDate);

    // and
    actorServiceSpy.findActorByName.withArgs(actor1.name).and.returnValue(actor1);
    actorServiceSpy.findActorByName.withArgs(actor2.name).and.returnValue(actor2);
    actorServiceSpy.findActorByName.withArgs(actor3.name).and.returnValue(actor3);
    actorServiceSpy.findActorByName.withArgs(actor4.name).and.returnValue(actor4);

    // when
    service.performLongRest(8);

    //then
    expect(actor1.currentHP).toEqual(actor1.maxHP);
    expect(actor2.currentHP).toEqual(actor2.maxHP);
    expect(actor3.currentHP).toEqual(actor3.maxHP);
    expect(actor4.currentHP).toEqual(0);

    expect(service.getActorsToAvailableHitDiceMap()).toEqual(new Map<string, number>(
      [
        [actor1.name, 4],
        [actor2.name, 6],
        [actor3.name, 6],
        [actor4.name, 5],
      ]
    ))

    expect(temporalServiceSpy.addSeconds).toHaveBeenCalledWith(28_800);
  });

});
