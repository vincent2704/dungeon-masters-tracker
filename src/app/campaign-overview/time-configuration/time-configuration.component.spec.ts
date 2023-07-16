import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeConfigurationComponent } from './time-configuration.component';
import {NgbDateStruct, NgbModule, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TimeStructure} from "../../models/timeStructure";
import {CampaignService} from "../../services/campaign/campaign.service";
import {Campaign} from "../../models/campaign/campaign";
import {of} from "rxjs";

describe('TimeConfigurationComponent', () => {
  let component: TimeConfigurationComponent;
  let fixture: ComponentFixture<TimeConfigurationComponent>;

  let campaignServiceSpy: jasmine.SpyObj<CampaignService>

  beforeEach(async () => {
    const campaignService = jasmine.createSpyObj('CampaignService', ['setCurrentDate', 'getLocalStorageCampaign', 'updateLocalStorageCampaign']);

    await TestBed.configureTestingModule({
      imports: [NgbModule, FormsModule, HttpClientTestingModule],
      declarations: [ TimeConfigurationComponent ],
      providers: [
        { provide: CampaignService, useValue: campaignService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue({
      id: '123',
      name: "Dummy Name",
      campaignDateTimeStart: 0,
      campaignDateTimeCurrent: 0,
      lastLongRestDateTime: 0,
    } as Campaign)

    fixture = TestBed.createComponent(TimeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly subtract time using time structure', () => {
    //given
    component.dateModel = {day: 17, month: 12, year: 2020} as NgbDateStruct;
    component.timeModel = {hour: 18, minute: 30, second: 0} as NgbTimeStruct

    component.currentDate = component.getCurrentDateFromModels()

    component.timeChangeInput = new TimeStructure(12, 15, 6, 31, 61);
    const dateAfterSubtracting = new Date(2019, 11, 2, 11, 57,59)

    const currentCampaignState = {
      name: "Dummy Name",
      campaignDateTimeStart: -14057296560000,
      campaignDateTimeCurrent: component.currentDate.getTime(),
      lastLongRestDateTime: -14057296560000,
    } as Campaign
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue(currentCampaignState)
    campaignServiceSpy.setCurrentDate.and.returnValue(of(currentCampaignState))

    //when
    component.subtractTime();

    //then
    expect(campaignServiceSpy.setCurrentDate).toHaveBeenCalledOnceWith(dateAfterSubtracting);
  });

    it('should properly add one month', () => {
    //given
      component.dateModel = {day: 17, month: 7, year: 1524} as NgbDateStruct;
      component.timeModel = {hour: 18, minute: 30, second: 0} as NgbTimeStruct

      component.currentDate = component.getCurrentDateFromModels()

      component.timeChangeInput = new TimeStructure(1, 0, 0, 0, 0);

      const currentCampaignState = {
        name: "Dummy Name",
        campaignDateTimeStart: -14057296560000,
        campaignDateTimeCurrent: -14057296560000,
        lastLongRestDateTime: -14057296560000,
      } as Campaign
      campaignServiceSpy.getLocalStorageCampaign.and.returnValue(currentCampaignState)
      campaignServiceSpy.setCurrentDate.and.returnValue(of(currentCampaignState))

    //when
    component.addTime();

    //then
    expect(campaignServiceSpy.setCurrentDate)
      .toHaveBeenCalledOnceWith(new Date(1524, 7, 17, 20, 48,0))
  });

    it('should properly add time using time structure', () => {
    //given
      component.dateModel = {day: 17, month: 12, year: 2020};
      component.timeModel = {hour: 18, minute: 30, second: 0}
      component.currentDate = component.getCurrentDateFromModels()

      component.timeChangeInput = new TimeStructure(1, 15, 6, 31, 61);

      const currentCampaignState = {
        name: "Dummy Name",
        campaignDateTimeStart: -14057296560000,
        campaignDateTimeCurrent: component.getCurrentDateFromModels().getTime(),
        lastLongRestDateTime: -14057296560000,
      } as Campaign
      campaignServiceSpy.getLocalStorageCampaign.and.returnValue(currentCampaignState)
      campaignServiceSpy.setCurrentDate.and.returnValue(of(currentCampaignState))

    //when
    component.addTime();

    //then
      expect(campaignServiceSpy.setCurrentDate)
        .toHaveBeenCalledOnceWith(new Date(2021, 1, 2, 1, 2,1))
  });

  it('should correctly set the new date', () => {
    //given
    component.currentDate = new Date(2021, 1, 2, 1, 2,1)

    //then
    expect(component.getCurrentDateInfo()).toEqual('2, February, 2021');
  });

});
