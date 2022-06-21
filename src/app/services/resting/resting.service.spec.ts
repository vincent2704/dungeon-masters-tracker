import { TestBed } from '@angular/core/testing';

import { RestingService } from './resting.service';
import {ActorService} from "../actor/actor.service";
import {TemporalService} from "../temporal/temporal.service";
import {Actor} from "../../models/actor";
import {ShortRestInput} from "../../models/resting/shortRestInput";

describe('RestingService', () => {
  let service: RestingService;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let temporalServiceSpy: jasmine.SpyObj<TemporalService>;

  beforeEach(() => {
    const actorSpy = jasmine.createSpyObj('ActorService', ['getActors']);
    const temporalSpy = jasmine.createSpyObj('TemporalService', ['addSeconds']);

    TestBed.configureTestingModule({
      providers: [
        RestingService,
        { provide: ActorService, useValue: actorSpy },
        { provide: TemporalService, useValue: temporalSpy },
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
    let actorsToHitDiceMap = new Map<Actor, number>([
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
    let actor1 = new Actor('Actor One', 14, 5, 1, 5);
    let actor2 = new Actor('Actor Two', 14, 5, 1, 6);

    let actorsToHitDiceMap = new Map<Actor, number>([
      [actor1, actor1.level],
      [actor2, actor2.level],
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

    expect(service.getActorsToAvailableHitDiceMap()).toEqual(new Map<Actor, number>([
      [actor1, 2],
      [actor2, 4],
    ]));
    expect(temporalServiceSpy.addSeconds).toHaveBeenCalledWith(7200);
  });

});
