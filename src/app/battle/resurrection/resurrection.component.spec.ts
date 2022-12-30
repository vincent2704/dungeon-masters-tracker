import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResurrectionComponent } from './resurrection.component';
import {NgbCollapse, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {Actor} from "../../models/actors/actor";
import {CampaignService} from "../../services/campaign/campaign.service";
import {DateUtils} from "../../utilities/date/dateUtils";
import {Campaign} from "../../models/campaign/campaign";

describe('ResurrectionComponent', () => {
  let component: ResurrectionComponent;
  let fixture: ComponentFixture<ResurrectionComponent>;

  let temporalServiceSpy: jasmine.SpyObj<CampaignService>;
  let currentDate = new Date(
    1524, 6, 17,
    18, 30, 0
  );

  beforeEach(async () => {
    const temporalService = jasmine.createSpyObj('CampaignService', ['getSessionStorageCampaign'])

    await TestBed.configureTestingModule({
      declarations: [ ResurrectionComponent, NgbCollapse, NgbTooltip ],
      providers: [
        {provide: CampaignService, useValue: temporalService},
      ]
    })
    .compileComponents();

    temporalServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;
    temporalServiceSpy.getSessionStorageCampaign.and.returnValue({
      name: "Dummy Name",
      campaignDateTimeStartEpoch: 0,
      campaignDateTimeCurrentEpoch: currentDate.getTime(),
      lastLongRestTimeEpoch: 0,
    } as Campaign)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResurrectionComponent);
    component = fixture.componentInstance;
    component.character = new Actor('Character', 10)
    component.character.kill(new Date(
      1524, 6, 17,
      18, 30, 0
    ));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow to use Revivify', () => {
    //given
    component.round = 11;

    //then
    expect(component.canRevivify()).toBeTrue();
  });

  it('should not allow to use Revivify', () => {
    //given
    component.round = 12;

    //then
    expect(component.canRevivify()).toBeFalse();

    // and when
    DateUtils.subtractDays(component.character.getTimeOfDeath(), 10)
    // then
    expect(component.canRevivify()).toBeFalse();
  });

  it('should allow to use Raise Dead', () => {
    //given
    //pass exactly 10 days since character's death, not a second more
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyTenDaysAgo = DateUtils.subtractDays(currentDate, 10);
    component.character.kill(exactlyTenDaysAgo);
    //and
    component.round = 1;

    //then
    expect(component.canRaiseDead()).toBeTrue();
  });

  it('should not allow to use Raise Dead', () => {
    //given
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyTenDaysAgo = DateUtils.subtractDays(currentDate, 10);
    component.character.kill(exactlyTenDaysAgo);
    component.round = 2; // 10 days ago + 6 seconds (after 1st round finished)

    //then
    expect(component.canRaiseDead()).toBeFalse();
  });

  it('should allow to use Reincarnate', () => {
    //given
    //pass exactly 10 days since character's death, not a second more
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyTenDaysAgo = DateUtils.subtractDays(currentDate, 10);
    component.character.kill(exactlyTenDaysAgo);
    //and
    component.round = 1;

    //then
    expect(component.canReincarnate()).toBeTrue();
  });

  it('should not allow to use Reincarnate', () => {
    //given
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyTenDaysAgo = DateUtils.subtractDays(currentDate, 10);
    component.character.kill(exactlyTenDaysAgo);
    component.round = 2; // 10 days ago + 6 seconds (after 1st round finished)

    //then
    expect(component.canReincarnate()).toBeFalse();
  });

  it('should allow to use Resurrection', () => {
    //given
    //pass exactly 10 days since character's death, not a second more
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyHundredYearsAgo = DateUtils.subtractYears(currentDate, 100);
    component.character.kill(exactlyHundredYearsAgo);
    //and
    component.round = 1;

    //then
    expect(component.canResurrection()).toBeTrue();
  });

  it('should not allow to use Resurrection', () => {
    //given
    //pass exactly 10 days since character's death, not a second more
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyHundredYearsAgo = DateUtils.subtractYears(currentDate, 100);
    component.character.kill(exactlyHundredYearsAgo);
    //and
    component.round = 2; // 6 seconds passed

    //then
    expect(component.canResurrection()).toBeFalse();
  });

  it('should allow to use True Resurrection', () => {
    //given
    //pass exactly 10 days since character's death, not a second more
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyTwoHundredYearsAgo = DateUtils.subtractYears(currentDate, 200);
    component.character.kill(exactlyTwoHundredYearsAgo);
    //and
    component.round = 1;

    //then
    expect(component.canTrueResurrection()).toBeTrue();
  });

  it('should not allow to use True Resurrection', () => {
    //given
    //pass exactly 10 days since character's death, not a second more
    component.character = new Actor('Character', 10);
    const currentDate = new Date(temporalServiceSpy.getSessionStorageCampaign().campaignDateTimeCurrentEpoch);
    let exactlyTwoHundredYearsAgo = DateUtils.subtractYears(currentDate, 200);
    component.character.kill(exactlyTwoHundredYearsAgo);
    //and
    component.round = 2; // 6 seconds passed

    //then
    expect(component.canTrueResurrection()).toBeFalse();
  });

  it('should return time of death formatted', () => {
    expect(component.getTimeOfDeathFormatted()).toEqual('17 July 1524, 18:30');
  });

  it('should return died ago time', () => {
    //given
    component.character = new Actor('Character', 10)
    component.character.kill(new Date(
      1524, 6, 17,
      18, 30, 0
    ));
    //and
    component.round = 11;
    expect(component.getDiedAgoTime()).toEqual('60 seconds');
  });

});
