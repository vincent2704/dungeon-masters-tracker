import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignEventsComponent } from './campaign-events.component';

describe('CampaignEventsComponent', () => {
  let component: CampaignEventsComponent;
  let fixture: ComponentFixture<CampaignEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
