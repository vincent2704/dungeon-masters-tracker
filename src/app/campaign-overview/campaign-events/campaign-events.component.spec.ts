import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignEventsComponent } from './campaign-events.component';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CampaignEventsComponent', () => {
  let component: CampaignEventsComponent;
  let fixture: ComponentFixture<CampaignEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ CampaignEventsComponent, NgbCollapse ]
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
