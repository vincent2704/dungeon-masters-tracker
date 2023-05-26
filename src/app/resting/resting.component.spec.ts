import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestingComponent } from './resting.component';
import { ShortRestComponent } from "./short-rest/short-rest.component";
import { FormsModule } from "@angular/forms";
import { LongRestComponent } from "./long-rest/long-rest.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CalendarSystem, Campaign } from "../models/campaign/campaign";

describe('RestingComponent', () => {
  let component: RestingComponent;
  let fixture: ComponentFixture<RestingComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ RestingComponent, ShortRestComponent, LongRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('campaign', JSON.stringify(localStorageCampaign))
    fixture = TestBed.createComponent(RestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
