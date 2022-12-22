import {TestBed} from '@angular/core/testing';

import {RestingService} from './resting.service';
import {ActorService} from "../actor/actor.service";
import {CampaignService} from "../campaign/campaign.service";
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {of} from "rxjs";
import {Campaign} from "../../models/campaign/campaign";

describe('RestingService', () => {
  let service: RestingService;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let temporalServiceSpy: jasmine.SpyObj<CampaignService>;

  const sessionStorageCampaign = {
    name: "Dummy Name",
    campaignDateTimeStartEpoch: -14057296560,
    campaignDateTimeCurrentEpoch: -14057296560,
    realDateStart: -14057296560,
    realDateLastPlayed: -14057296560,
    lastLongRestTimeEpoch: -14057296560
  } as Campaign

  beforeEach(() => {
    const actorSpy = jasmine.createSpyObj('ActorService', ['updatePlayerCharacters']);
    const temporalSpy = jasmine.createSpyObj('TemporalService', ['addSeconds', 'getSessionStorageCurrentDate', 'getLastLongRestDate', 'setLastLongRestDate']);

    TestBed.configureTestingModule({
      providers: [
        RestingService,
        {provide: ActorService, useValue: actorSpy},
        {provide: CampaignService, useValue: temporalSpy},
      ]
    });

    sessionStorage.setItem('campaign', JSON.stringify(sessionStorageCampaign))

    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    temporalServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;

    service = TestBed.inject(RestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it("should return actor's available Hit Dice", () => {
  //   //given
  //   let actor1: PlayerCharacter = {
  //     name: 'Actor One',
  //     maxHp: 14,
  //     currentHp: 5,
  //     level: 5
  //   }
  //   let actor2: PlayerCharacter = {
  //     name: 'Actor Two',
  //     maxHp: 14,
  //     currentHp: 5,
  //     level: 6
  //   }
  //   let actorsToHitDiceMap = new Map<PlayerCharacter, number>([
  //     [actor1, actor1.level],
  //     [actor2, actor2.level],
  //   ])
  //
  //   service.setActorsToAvailableHitDiceMap(actorsToHitDiceMap)
  //
  //   //then
  //   expect(service.getActorsAvailableHitDice(actor1)).toEqual(5);
  //   expect(service.getActorsAvailableHitDice(actor2)).toEqual(6);
  // });

  it("should properly perform short rest", () => {
    // given
    let actor1: PlayerCharacter = {
      id: 1,
      name: 'Actor One',
      maxHp: 14,
      currentHp: 5,
      level: 5,
      availableHitDice: 4
    }
    let actor2: PlayerCharacter = {
      id: 2,
      name: 'Actor Two',
      maxHp: 14,
      currentHp: 5,
      level: 6,
      availableHitDice: 3
    }

    const playerCharactersToShortRestInput = new Map<PlayerCharacter, ShortRestInput>([
      [actor1, new ShortRestInput(2, 7)],
      [actor2, new ShortRestInput(3, 15)],
    ])

    actorServiceSpy.updatePlayerCharacters.and.returnValue(of([]));

    // when
    service.performShortRest(2, playerCharactersToShortRestInput);

    // then
    let actor1AfterResting: PlayerCharacter = {
      id: 1,
      name: 'Actor One',
      maxHp: 14,
      currentHp: 12,
      level: 5,
      availableHitDice: 2
    }
    let actor2AfterResting: PlayerCharacter = {
      id: 2,
      name: 'Actor Two',
      maxHp: 14,
      currentHp: 14,
      level: 6,
      availableHitDice: 0
    }

    expect(temporalServiceSpy.addSeconds).toHaveBeenCalledWith(7200);
    expect(actorServiceSpy.updatePlayerCharacters).toHaveBeenCalledWith([
      actor1AfterResting, actor2AfterResting
    ]);
  });


  it("should return time passed since last long rest", () => {
    //given
    let restFinishedAt = new Date(1524, 6, 17, 18, 30, 0);
    temporalServiceSpy.getLastLongRestDate.and.returnValue(restFinishedAt)
    // and
    let currentDate = new Date(1524, 6, 17, 23, 30, 0);
    temporalServiceSpy.getSessionStorageCurrentDate.and.returnValue(currentDate);

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
    temporalServiceSpy.getSessionStorageCurrentDate.and.returnValue(currentDate);

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
    temporalServiceSpy.getSessionStorageCurrentDate.and.returnValue(currentDate);

    //when
    let minimumLongRestTime = service.getMinimumRestingTime();

    //then
    expect(minimumLongRestTime).toEqual(23);
  });

  it("should perform Long Rest", () => {
    // given
    const restTimeInHours = 8;
    let actor1: PlayerCharacter = {
      id: 1,
      name: 'Actor One',
      maxHp: 14,
      currentHp: 5,
      level: 5,
      availableHitDice: 1
    }
    let actor2: PlayerCharacter = {
      id: 2,
      name: 'Actor Two',
      maxHp: 14,
      currentHp: 5,
      level: 6,
      availableHitDice: 6
    }
    let actor3: PlayerCharacter = {
      name: 'Actor Three',
      maxHp: 14,
      currentHp: 5,
      level: 6,
      availableHitDice: 5
    }
    let actor4: PlayerCharacter = {
      name: 'Actor Four',
      maxHp: 14,
      currentHp: 0,
      level: 6,
      availableHitDice: 5
    }
    let actor5: PlayerCharacter = {
      name: 'Actor Five',
      maxHp: 14,
      currentHp: 1,
      level: 1,
      availableHitDice: 0
    }
    const playerCharacters: PlayerCharacter[] = [
      actor1, actor2, actor3, actor4, actor5
    ]

    // and
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    temporalServiceSpy.getLastLongRestDate.and.returnValue(restFinishedAt);
    let currentDate = new Date(1524, 6, 18, 10, 30, 0);
    temporalServiceSpy.getSessionStorageCurrentDate.and.returnValue(currentDate);
    actorServiceSpy.updatePlayerCharacters.and.returnValue(of([]));
    temporalServiceSpy.addSeconds.and.returnValue(of(sessionStorageCampaign))

    // when
    service.performLongRest(restTimeInHours, playerCharacters)

    // then
    expect(temporalServiceSpy.addSeconds).toHaveBeenCalledOnceWith(28_800);
    expect(actorServiceSpy.updatePlayerCharacters).toHaveBeenCalledOnceWith([
      {
        id: 1,
        name: 'Actor One',
        maxHp: 14,
        currentHp: 14,
        level: 5,
        availableHitDice: 3
      },
      {
        id: 2,
        name: 'Actor Two',
        maxHp: 14,
        currentHp: 14,
        level: 6,
        availableHitDice: 6
      },
      {
        name: 'Actor Three',
        maxHp: 14,
        currentHp: 14,
        level: 6,
        availableHitDice: 6
      },
      {
        name: 'Actor Four',
        maxHp: 14,
        currentHp: 0,
        level: 6,
        availableHitDice: 5
      },
      {
        name: 'Actor Five',
        maxHp: 14,
        currentHp: 14,
        level: 1,
        availableHitDice: 1
      }
    ])
  });

});
