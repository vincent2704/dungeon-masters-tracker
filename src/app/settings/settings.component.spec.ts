import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {CampaignService} from "../services/campaign/campaign.service";
import {Campaign} from "../models/campaign/campaign";
import {FormsModule} from "@angular/forms";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let campaignServiceSpy: jasmine.SpyObj<CampaignService>

  beforeEach(async () => {
    const campaignService = jasmine.createSpyObj('CampaignService', ['getLocalStorageCampaign', 'reloadCampaign'])
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: CampaignService, useValue: campaignService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>;
    campaignServiceSpy.getLocalStorageCampaign.and.returnValue({
      id: 'someId'
    } as Campaign);

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
