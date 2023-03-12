import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {CampaignService} from "../services/campaign/campaign.service";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let campaignServiceSpy: jasmine.SpyObj<CampaignService>

  beforeEach(async () => {
    const campaignService = jasmine.createSpyObj('CampaignService', ['reloadCampaign'])
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      providers: [
        { provide: CampaignService, useValue: campaignService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
