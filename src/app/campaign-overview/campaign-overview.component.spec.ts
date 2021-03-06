import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignOverviewComponent } from './campaign-overview.component';
import {ActorService} from "../services/actor/actor.service";
import {Actor} from "../models/actor";
import {FormsModule} from "@angular/forms";
import {TimeConfigurationComponent} from "./time-configuration/time-configuration.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CampaignEventsComponent} from "./campaign-events/campaign-events.component";

describe('CampaignOverviewComponent', () => {
  let component: CampaignOverviewComponent;
  let fixture: ComponentFixture<CampaignOverviewComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getActors', 'deleteActor', 'setActors']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgbModule],
      declarations: [ CampaignOverviewComponent, TimeConfigurationComponent, CampaignEventsComponent ],
      providers: [
        { provide: ActorService, useValue: actorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    actorServiceSpy.getActors.and.returnValue([]);
    fixture = TestBed.createComponent(CampaignOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add actor to list of actors to delete', () => {
    //given
    let actorToDelete = new Actor('Actor', 10)
    //when
    component.onSetActorToDelete(actorToDelete);
    //then
    expect(component.actorsToDelete).toEqual([actorToDelete]);
  });

  it('should change actors if changes are submitted', () => {
    //given
    let actor1 = new Actor('Actor', 10);
    actor1.setLevel(1);
    let actor2 = new Actor('Actor 2', 15);
    let actor3 = new Actor('Actor 3', 14);
    let defaultActors = [actor1, actor2, actor3];

    actorServiceSpy.getActors.and.returnValue(defaultActors)
    fixture = TestBed.createComponent(CampaignOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //when
    component.playerCharacters[0].level = 12;
    component.onSetActorToDelete(actor2);

    component.newActorName = 'Actor 4'
    component.newActorLevel = '4';
    component.newActorMaxHp = '5'
    component.addActor();

    //and
    component.onSubmitProtagonists();

    //then
    expect(component.actorsToDelete).toEqual([]);
    expect(component.actorsToAdd).toEqual([]);
    expect(component.playerCharacters[0].level).toEqual(12);
    expect(component.playerCharacters.length).toEqual(4);
    expect(actorServiceSpy.setActors).toHaveBeenCalledWith(component.playerCharacters);
  });

  it('should not change actors if changes are cancelled', () => {
    //given
    let actor1 = new Actor('Actor', 10);
    actor1.setLevel(1);
    let actor2 = new Actor('Actor 2', 15);
    let actor3 = new Actor('Actor 3', 14);
    let defaultActors = [actor1, actor2, actor3];

    actorServiceSpy.getActors.and.returnValue(defaultActors)
    fixture = TestBed.createComponent(CampaignOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //when
    component.playerCharacters[0].level = 12;
    component.onSetActorToDelete(actor2);

    component.newActorName = 'Actor 4'
    component.newActorLevel = '4';
    component.newActorMaxHp = '5'
    component.addActor();

    //and
    component.onCancelEdit();

    //then
    expect(component.actorsToDelete).toEqual([]);
    expect(component.actorsToAdd).toEqual([]);
    expect(component.playerCharacters[0].level).toEqual(1);
    expect(component.playerCharacters.length).toEqual(3);
    expect(actorServiceSpy.setActors).toHaveBeenCalledTimes(0);
  });

});
