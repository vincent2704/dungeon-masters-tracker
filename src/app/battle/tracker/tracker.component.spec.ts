import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackerComponent} from './tracker.component';
import {Actor} from "../../models/actors/actor";
import {BattleCondition} from "../../models/battleCondition";
import {Condition} from "../../models/Condition";
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "../add-actor/add-actor.component";
import {ActorService} from "../../services/actor/actor.service";
import {of} from "rxjs";
import {BattleParticipantType} from "../../models/actors/battleParticipantType";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CampaignService} from "../../services/campaign/campaign.service";
import {Campaign} from "../../models/campaign/campaign";

describe('TrackerComponent', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;

  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let campaignServiceSpy: jasmine.SpyObj<CampaignService>

  beforeEach(async () => {
    const actorSpy = jasmine.createSpyObj('ActorService', ['updateCharactersAfterBattle']);
    const campaignService = jasmine.createSpyObj('CampaignService', ['getSessionStorageCampaign']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ TrackerComponent, AddActorComponent ],
      providers: [
        { provide: ActorService, useValue: actorSpy },
        { provide: CampaignService, useValue: campaignService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;

    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;

    campaignServiceSpy = TestBed.inject(CampaignService) as jasmine.SpyObj<CampaignService>
    campaignServiceSpy.getSessionStorageCampaign.and.returnValue({
      name: "Dummy Name",
      campaignDateTimeStartEpoch: 0,
      campaignDateTimeCurrentEpoch: 0,
      lastLongRestTimeEpoch: 0,
    } as Campaign)

    component.actors = [];
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should save actors after battle is concluded", () => {
    //given
    let actor1 = new Actor('Actor 1', 1, BattleParticipantType.PLAYER_CHARACTER)
    let actor2 = new Actor('Actor 2', 1, BattleParticipantType.PLAYER_CHARACTER)
    let actor3 = new Actor('Actor 3', 1, BattleParticipantType.PLAYER_CHARACTER)
    actor2.id = 2;
    actor3.id = 3;
    let date = new Date();
    actor3.modifyHp(-100, date);
    let actor4 = new Actor('Monster', 1)
    actor1.setDeathSavingThrowsEligibility(true);
    actor2.setDeathSavingThrowsEligibility(true);
    component.actors = [actor1, actor2, actor3, actor4]
    actorServiceSpy.updateCharactersAfterBattle.and.returnValue(of([]))

    // when
    component.endBattle();

    expect(actorServiceSpy.updateCharactersAfterBattle).toHaveBeenCalledOnceWith([{
      playerId: 2,
      playerCurrentHp: 1,
      timeOfDeath: undefined
    },
      {
        playerId: 3,
        playerCurrentHp: 0,
        timeOfDeath: date
      }]);
  });

  it('should progress actor', () => {
    let actor1 = new Actor('Actor 1', 1, 1, 1)
    let actor2 = new Actor('Actor 2', 1, 1, 2)
    let actor3 = new Actor('Actor 3', 1, 1, 3)
    component.actors = [actor1, actor2, actor3]


    component.progressActor(actor1);
    expect(component.progressedActors).toEqual([actor1]);
  });

  it("should increment round after all actors are progressed", () => {
    // given
    expect(component.round).toEqual(1);
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    component.actors = [actor1, actor2, actor3];

    // when
    component.progressActor(actor1);
    component.progressActor(actor2);

    // then
    expect(component.progressedActors).toEqual([actor1, actor2])

    // and when
    component.progressActor(actor3);

    // then
    expect(component.round).toEqual(2);
    expect(component.progressedActors).toEqual([]);
  });

  it("should decrement actor's temporary hit points duration after the end of actor's turn", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    component.actors = [actor1];

    // when
    actor1.setTemporaryHitPoints(10, 3);
    component.progressActor(actor1);

    // then
    expect(actor1.getTemporaryHitPoints().getTurnsLeft()).toEqual(2);
  });

  it("should decrement actor's condition duration after the end of actor's turn", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 1', 1);
    component.actors = [actor1, actor2];

    // when
    actor1.addCondition(new BattleCondition(Condition.BLINDED, 2));
    component.progressActor(actor1);
    component.progressActor(actor2);

    // then
    expect(actor1.getConditions()[0].getDurationInTurns()).toEqual(1);
    expect(actor2.getConditions()).toEqual([]);
  });

  it("should display death saving throws", () => {
    // given
    let actor = new Actor('Actor 1', 1);
    let date = new Date();
    actor.setDeathSavingThrowsEligibility(true);
    actor.modifyHp(-1, date);

    // then
    expect(component.showDeathSavingThrows(actor)).toBeTrue();
  });

  it("should not display death saving throws if character is ineligible", () => {
    // given
    let actor = new Actor('Actor 1', 1);
    let date = new Date();
    actor.setDeathSavingThrowsEligibility(false);
    actor.modifyHp(-1, date);

    // then
    expect(component.showDeathSavingThrows(actor)).toBeFalse();
  });

  it("should not display death saving throws if character is dead", () => {
    // given
    let actor = new Actor('Actor 1', 1, 1, 3);
    let date = new Date();
    actor.setDeathSavingThrowsEligibility(true);
    actor.kill(date);

    // then
    expect(component.showDeathSavingThrows(actor)).toBeFalse();
  });

});
