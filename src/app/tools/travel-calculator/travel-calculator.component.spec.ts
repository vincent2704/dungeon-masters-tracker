import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCalculatorComponent } from './travel-calculator.component';
import { Settings } from "../../services/settings/settings";
import { CampaignService } from "../../services/campaign/campaign.service";
import { FormsModule } from "@angular/forms";
import { CampaignUpdateRequest } from "../../models/campaign/campaignUpdateRequest";
import { of } from "rxjs";
import { CalendarSystem, Campaign } from "../../models/campaign/campaign";

describe('TravelCalculatorComponent', () => {
  let component: TravelCalculatorComponent;
  let fixture: ComponentFixture<TravelCalculatorComponent>;

  let campaignServiceSpy: jasmine.SpyObj<CampaignService>;

  beforeEach(async () => {
    const campaignService = jasmine.createSpyObj('CampaignService', ['getLocalStorageCampaign', 'updateCampaign', 'updateLocalStorageCampaign'])

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TravelCalculatorComponent],
      providers: [
        {provide: CampaignService, useValue: campaignService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TravelCalculatorComponent);
    component = fixture.componentInstance;

    campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('tracking time should be enabled by default', () => {
    expect(component.trackTime).toBeTrue()
  });

  it('should have <h2> with "Traveling calculator"', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const header = nativeElement.querySelector('h2')!;
    expect(header.textContent).toEqual('Traveling calculator');
  });

  it('should return correct placeholder in SI', () => {
    //given
    Settings.setSISystem(true);
    // when
    let placeholder = component.getTypeDistancePlaceholder();
    //then
    expect(placeholder).toEqual('Distance in kilometers');
  });

  it('should return correct placeholder in Imperial', () => {
    //given
    Settings.setSISystem(false);
    //when
    let placeholder = component.getTypeDistancePlaceholder();
    //then
    expect(placeholder).toEqual('Distance in miles');
  });

  it('should update travel time if time progress checkbox is checked', () => {
    //given
    Settings.setSISystem(true);
    component.trackTime = true;
    component.pace = 'Fast'

    const campaignId = '123';

    const initialCampaignState: Campaign = {
      id: campaignId,
      name: 'Name',
      campaignDateTimeStart: 0,
      campaignDateTimeCurrent: 1,
      lastLongRestDateTime: 0,
      realDateLastPlayed: new Date(),
      calendarSystem: CalendarSystem.GREGORIAN
    }

    const expectedCampaignUpdateRequest: CampaignUpdateRequest = {
      campaignCurrentDateTime: 14_400_001
    }

    const expectedCampaignState: Campaign = {
      id: campaignId,
      name: 'Name',
      campaignDateTimeStart: 0,
      campaignDateTimeCurrent: 14_400_001,
      lastLongRestDateTime: 0,
      realDateLastPlayed: new Date(),
      calendarSystem: CalendarSystem.GREGORIAN
    }

    campaignServiceSpy.getLocalStorageCampaign.and.returnValue(initialCampaignState)

    campaignServiceSpy.updateCampaign.withArgs(campaignId, expectedCampaignUpdateRequest)
      .and.returnValue(of(expectedCampaignState))

    //when
    component.updateTravelTime(24)

    //then
    expect(campaignServiceSpy.updateCampaign).toHaveBeenCalledWith(campaignId, expectedCampaignUpdateRequest);
  });

  it('should not update campaign time if time progress checkbox is not checked', () => {
    //given
    Settings.setSISystem(true);
    component.trackTime = false;
    component.pace = 'Fast' //4 godziny
    //when
    component.updateTravelTime(24)
    //then
    expect(campaignServiceSpy.updateCampaign).not.toHaveBeenCalled();
  });

  it('should display travel time in proper format', () => {
    //given
    Settings.setSISystem(true);
    component.trackTime = false;
    component.pace = 'Normal'
    let testData = [
      {"kilometers": 4.5, "hours": 1, "minutes": 0},
      {"kilometers": 6, "hours": 1, "minutes": 20},
      {"kilometers": 11.25, "hours": 2, "minutes": 30},
      {"kilometers": 1.125, "hours": 0, "minutes": 15},
    ]

    component.updateTravelTime(4.5)

    for (let data of testData) {
      component.updateTravelTime(data.kilometers)
      expect(component.travelInformation).toEqual(`Travel time: ${data.hours} hour(s) ${data.minutes} minute(s)`)
    }
  });

});
