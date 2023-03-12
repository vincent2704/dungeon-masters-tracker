import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSelectorComponent } from './campaign-selector.component';
import {CampaignService} from "../services/campaign/campaign.service";

describe('CampaignSelectorComponent', () => {
  let component: CampaignSelectorComponent;
  let fixture: ComponentFixture<CampaignSelectorComponent>;

  let campaignServiceSpy: jasmine.SpyObj<CampaignService>;

  beforeEach(async () => {
    const campaignService = jasmine.createSpyObj('CampaignService', ['reloadCampaign'])
    await TestBed.configureTestingModule({
      declarations: [ CampaignSelectorComponent ],
      providers: [
        { provide: CampaignService, useValue: campaignService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;

    fixture = TestBed.createComponent(CampaignSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
