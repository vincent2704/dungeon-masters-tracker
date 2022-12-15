import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignOverviewComponent } from './campaign-overview.component';
import {ActorService} from "../services/actor/actor.service";
import {FormsModule} from "@angular/forms";
import {TimeConfigurationComponent} from "./time-configuration/time-configuration.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CampaignEventsComponent} from "./campaign-events/campaign-events.component";
import {ProtagonistsManagerComponent} from "./protagonists-manager/protagonists-manager.component";
import {ProtagonistsInfoComponent} from "./protagonists-manager/protagonists-info/protagonists-info.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('CampaignOverviewComponent', () => {
  let component: CampaignOverviewComponent;
  let fixture: ComponentFixture<CampaignOverviewComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getPlayerCharacters2']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgbModule, HttpClientTestingModule],
      declarations: [ CampaignOverviewComponent, TimeConfigurationComponent,
        CampaignEventsComponent, ProtagonistsManagerComponent, ProtagonistsInfoComponent ],
      providers: [
        { provide: ActorService, useValue: actorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    actorServiceSpy.getPlayerCharacters2.and.returnValue(of([]));
    fixture = TestBed.createComponent(CampaignOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
