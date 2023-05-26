import { TestBed } from '@angular/core/testing';

import { RestingService } from './resting.service';
import { ActorService } from "../actor/actor.service";
import { CampaignService } from "../campaign/campaign.service";
import { ShortRestInput } from "../../models/resting/shortRestInput";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { of } from "rxjs";
import { CalendarSystem, Campaign } from "../../models/campaign/campaign";
import { CampaignUpdateRequest } from "../../models/campaign/campaignUpdateRequest";

describe('RestingService', () => {
  let service: RestingService;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let campaignServiceSpy: jasmine.SpyObj<CampaignService>;

  const localStorageCampaign = {
    id: '123',
    name: "Dummy Name",
    campaignDateTimeStart: -14057296560,
    campaignDateTimeCurrent: -14057296560,
    realDateStart: -14057296560,
    realDateLastPlayed: new Date(),
    lastLongRestDateTime: -14057296560,
    calendarSystem: CalendarSystem.GREGORIAN
  } as Campaign

  beforeEach(() => {
    const actorSpy = jasmine.createSpyObj('ActorService', ['updatePlayerCharacters']);
    const campaignSpy = jasmine.createSpyObj('CampaignService', ['getLocalStorageCampaign', 'updateCampaign', 'updateLocalStorageCampaign']);

    TestBed.configureTestingModule({
      providers: [
        RestingService,
        {provide: ActorService, useValue: actorSpy},
        {provide: CampaignService, useValue: campaignSpy},
      ]
    });

    localStorage.setItem('campaign', JSON.stringify(localStorageCampaign))

    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;

    service = TestBed.inject(RestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should properly perform short rest", () => {
    // given
    actorServiceSpy.updatePlayerCharacters.and.returnValue(of([]));
    campaignServiceSpy.updateCampaign.and.returnValue(of({
    } as Campaign));

    const currentDate = new Date(1524, 6, 17, 23, 30, 0);
    const dateTimeAfterShortRest = new Date(1524, 6, 18, 1, 30, 0);
    const longRestFinished = new Date(1524, 6, 17, 18, 30, 0);
    const campaignId = '123';
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue(
      {
        id: campaignId,
        name: 'Campaign Name',
        campaignDateTimeStart: 1,
        campaignDateTimeCurrent: currentDate.getTime(),
        lastLongRestDateTime: longRestFinished.getTime()
      } as Campaign
    )

    // and

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

    expect(actorServiceSpy.updatePlayerCharacters).toHaveBeenCalledWith([
      actor1AfterResting, actor2AfterResting
    ]);
    expect(campaignServiceSpy.updateCampaign).toHaveBeenCalledOnceWith(campaignId,
      {
        campaignCurrentDateTime: dateTimeAfterShortRest.getTime(),
      } as CampaignUpdateRequest
    )
    expect(campaignServiceSpy.updateLocalStorageCampaign).toHaveBeenCalled();
  });


  it("should return time passed since last long rest", () => {
    //given
    let currentDate = new Date(1524, 6, 17, 23, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 18, 30, 0);

    // and
    const localStorageCampaign: Campaign = {
      id: '123',
      name: 'Campaign Name',
      campaignDateTimeStart: 1,
      campaignDateTimeCurrent: currentDate.getTime(),
      lastLongRestDateTime: restFinishedAt.getTime(),
      realDateLastPlayed: new Date(),
      calendarSystem: CalendarSystem.GREGORIAN
    }
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue(localStorageCampaign)

    //when
    let timePassed = service.getTimeSinceLastLongRest(localStorageCampaign);

    //then
    expect(timePassed).toEqual(5);
  });

  it("should set minimum rest time for party that last time rested 24 hours ago or longer", () => {
    //given
    let currentDate = new Date(1524, 6, 18, 23, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 18, 30, 0);
    const localStorageCampaign: Campaign =
    {
      id: '123',
      name: 'Campaign Name',
      campaignDateTimeStart: 1,
      campaignDateTimeCurrent: currentDate.getTime(),
      lastLongRestDateTime: restFinishedAt.getTime(),
      realDateLastPlayed: new Date(),
      calendarSystem: CalendarSystem.GREGORIAN
    }

      campaignServiceSpy.getLocalStorageCampaign.and.returnValue(localStorageCampaign)

    //when
    let minimumLongRestTime = service.getMinimumRestingTime(localStorageCampaign);

    //then
    expect(minimumLongRestTime).toEqual(8);
  });

  it("should set minimum rest time for party that last time rested less than 24 hours ago", () => {
    //given
    let currentDate = new Date(1524, 6, 17, 19, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    const localStorageCampaign: Campaign = {
      id: '123',
      name: 'Campaign Name',
      campaignDateTimeStart: 1,
      campaignDateTimeCurrent: currentDate.getTime(),
      lastLongRestDateTime: restFinishedAt.getTime(),
      realDateLastPlayed: new Date(),
      calendarSystem: CalendarSystem.GREGORIAN
    }
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue(localStorageCampaign)

    //when
    let minimumLongRestTime = service.getMinimumRestingTime(localStorageCampaign);

    //then
    expect(minimumLongRestTime).toEqual(23);
  });

  it("should not allow long rest if rest time is too short", () => {
    //given
    let currentDate = new Date(1524, 6, 17, 19, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    const localStorageCampaign: Campaign = {
      id: '123',
      name: 'Campaign Name',
      campaignDateTimeStart: 1,
      campaignDateTimeCurrent: currentDate.getTime(),
      lastLongRestDateTime: restFinishedAt.getTime(),
      realDateLastPlayed: new Date(),
      calendarSystem: CalendarSystem.GREGORIAN
    }
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue(localStorageCampaign)

    //when
    let minimumLongRestTime = service.getMinimumRestingTime(localStorageCampaign);
    expect(minimumLongRestTime).toEqual(23);

    service.performLongRest(22, [])

    //then
    expect(campaignServiceSpy.updateCampaign).not.toHaveBeenCalled()
    expect(campaignServiceSpy.updateLocalStorageCampaign).not.toHaveBeenCalled()
    expect(actorServiceSpy.updatePlayerCharacters).not.toHaveBeenCalled()
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
    const campaignLastLongRestDateTime = new Date(1524, 9, 10);
    const campaignDateTimeCurrent = new Date(1524, 9, 12);
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue({
      name: 'Campaign Name',
      campaignDateTimeStart: 1,
      campaignDateTimeCurrent: campaignDateTimeCurrent.getTime(),
      lastLongRestDateTime: campaignLastLongRestDateTime.getTime()
    } as Campaign)

    const campaignAfterShortRestResponse: Campaign = {
      id: '123',
      name: 'Updated Campaign',
      campaignDateTimeStart: 1,
      campaignDateTimeCurrent: campaignDateTimeCurrent.getTime() + 8 * 3_600_000,
      lastLongRestDateTime: campaignLastLongRestDateTime.getTime() + 8 * 3_600_000,
      realDateLastPlayed: new Date(),
      calendarSystem: CalendarSystem.GREGORIAN
    }
    campaignServiceSpy.updateCampaign.and.returnValue(of(
      campaignAfterShortRestResponse
    ))
    actorServiceSpy.updatePlayerCharacters.and.returnValue(of([]));

    // when
    service.performLongRest(restTimeInHours, playerCharacters)

    // then
    expect(campaignServiceSpy.updateLocalStorageCampaign).toHaveBeenCalledOnceWith(campaignAfterShortRestResponse);
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
