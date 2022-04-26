import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignOverviewComponent } from './campaign-overview.component';
import {ActorService} from "../services/actor/actor.service";
import {Actor} from "../models/actor";
import {FormsModule} from "@angular/forms";

describe('CampaignOverviewComponent', () => {
  let component: CampaignOverviewComponent;
  let fixture: ComponentFixture<CampaignOverviewComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getActors', 'deleteActor']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CampaignOverviewComponent ],
      providers: [
        { provide: ActorService, useValue: actorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignOverviewComponent);
    component = fixture.componentInstance;
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke actor service to remove actor globally', () => {
    //given
    component.actorsToDelete = [];

    //when
    let actorToDelete = new Actor('Actor', 10)
    component.onSetActorToDelete(actorToDelete);

    //then
    expect(component.actorsToDelete).toEqual([actorToDelete]);
  });

});
