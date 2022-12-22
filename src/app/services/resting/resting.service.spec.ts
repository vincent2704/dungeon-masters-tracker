import {TestBed} from '@angular/core/testing';

import {RestingService} from './resting.service';
import {ActorService} from "../actor/actor.service";
import {CampaignService} from "../campaign/campaign.service";
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {of} from "rxjs";
import {Campaign} from "../../models/campaign/campaign";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";

describe('RestingService', () => {
  let service: RestingService;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let campaignServiceSpy: jasmine.SpyObj<CampaignService>;

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
    const campaignSpy = jasmine.createSpyObj('CampaignService', ['getSessionStorageCampaign', 'updateCampaign', 'updateSessionStorageCampaign']);

    TestBed.configureTestingModule({
      providers: [
        RestingService,
        {provide: ActorService, useValue: actorSpy},
        {provide: CampaignService, useValue: campaignSpy},
      ]
    });

    sessionStorage.setItem('campaign', JSON.stringify(sessionStorageCampaign))

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
    campaignServiceSpy.getSessionStorageCampaign.and.returnValue(
      {
        name: 'Campaign Name',
        campaignDateTimeStartEpoch: 1,
        campaignDateTimeCurrentEpoch: currentDate.getTime(),
        lastLongRestTimeEpoch: longRestFinished.getTime()
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
    expect(campaignServiceSpy.updateCampaign).toHaveBeenCalledOnceWith(
      {
        campaignDateTimeCurrentEpoch: dateTimeAfterShortRest.getTime(),
      } as CampaignUpdateRequest
    )
    expect(campaignServiceSpy.updateSessionStorageCampaign).toHaveBeenCalled();
  });


  it("should return time passed since last long rest", () => {
    //given
    let currentDate = new Date(1524, 6, 17, 23, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 18, 30, 0);

    // and
    const sessionStorageCampaign: Campaign = {
      name: 'Campaign Name',
      campaignDateTimeStartEpoch: 1,
      campaignDateTimeCurrentEpoch: currentDate.getTime(),
      lastLongRestTimeEpoch: restFinishedAt.getTime()
    }
    campaignServiceSpy.getSessionStorageCampaign.and.returnValue(sessionStorageCampaign)

    //when
    let timePassed = service.getTimeSinceLastLongRest(sessionStorageCampaign);

    //then
    expect(timePassed).toEqual(5);
  });

  it("should set minimum rest time for party that last time rested 24 hours ago or longer", () => {
    //given
    let currentDate = new Date(1524, 6, 18, 23, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 18, 30, 0);
    const sessionStorageCampaign: Campaign =
    {
      name: 'Campaign Name',
        campaignDateTimeStartEpoch: 1,
      campaignDateTimeCurrentEpoch: currentDate.getTime(),
      lastLongRestTimeEpoch: restFinishedAt.getTime()
    }

      campaignServiceSpy.getSessionStorageCampaign.and.returnValue(sessionStorageCampaign)

    //when
    let minimumLongRestTime = service.getMinimumRestingTime(sessionStorageCampaign);

    //then
    expect(minimumLongRestTime).toEqual(8);
  });

  it("should set minimum rest time for party that last time rested less than 24 hours ago", () => {
    //given
    let currentDate = new Date(1524, 6, 17, 19, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    const sessionStorageCampaign: Campaign = {
      name: 'Campaign Name',
      campaignDateTimeStartEpoch: 1,
      campaignDateTimeCurrentEpoch: currentDate.getTime(),
      lastLongRestTimeEpoch: restFinishedAt.getTime()
    }
    campaignServiceSpy.getSessionStorageCampaign.and.returnValue(sessionStorageCampaign)

    //when
    let minimumLongRestTime = service.getMinimumRestingTime(sessionStorageCampaign);

    //then
    expect(minimumLongRestTime).toEqual(23);
  });

  it("should not allow long rest if rest time is too short", () => {
    //given
    let currentDate = new Date(1524, 6, 17, 19, 30, 0);
    let restFinishedAt = new Date(1524, 6, 17, 10, 30, 0);
    const sessionStorageCampaign: Campaign = {
      name: 'Campaign Name',
      campaignDateTimeStartEpoch: 1,
      campaignDateTimeCurrentEpoch: currentDate.getTime(),
      lastLongRestTimeEpoch: restFinishedAt.getTime()
    }
    campaignServiceSpy.getSessionStorageCampaign.and.returnValue(sessionStorageCampaign)

    //when
    let minimumLongRestTime = service.getMinimumRestingTime(sessionStorageCampaign);
    expect(minimumLongRestTime).toEqual(23);

    service.performLongRest(22, [])

    //then
    expect(campaignServiceSpy.updateCampaign).not.toHaveBeenCalled()
    expect(campaignServiceSpy.updateSessionStorageCampaign).not.toHaveBeenCalled()
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
    campaignServiceSpy.getSessionStorageCampaign.and.returnValue({
      name: 'Campaign Name',
      campaignDateTimeStartEpoch: 1,
      campaignDateTimeCurrentEpoch: campaignDateTimeCurrent.getTime(),
      lastLongRestTimeEpoch: campaignLastLongRestDateTime.getTime()
    } as Campaign)

    const campaignAfterShortRestResponse: Campaign = {
      name: 'Updated Campaign',
      campaignDateTimeStartEpoch: 1,
      campaignDateTimeCurrentEpoch: campaignDateTimeCurrent.getTime() + 8 * 3_600_000,
      lastLongRestTimeEpoch: campaignLastLongRestDateTime.getTime() + 8 * 3_600_000
    }
    campaignServiceSpy.updateCampaign.and.returnValue(of(
      campaignAfterShortRestResponse
    ))
    actorServiceSpy.updatePlayerCharacters.and.returnValue(of([]));

    // when
    service.performLongRest(restTimeInHours, playerCharacters)

    // then
    expect(campaignServiceSpy.updateSessionStorageCampaign).toHaveBeenCalledOnceWith(campaignAfterShortRestResponse);
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
