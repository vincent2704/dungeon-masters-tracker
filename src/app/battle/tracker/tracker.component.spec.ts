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

describe('TrackerComponent', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;

  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    const actorSpy = jasmine.createSpyObj('ActorService', ['updateCharactersAfterBattle']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TrackerComponent, AddActorComponent ],
      providers: [
        { provide: ActorService, useValue: actorSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;

    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    component.actors = [];
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should save actors after battle is concluded", () => {
    //given
    let actor1 = new Actor('Actor 1', 1)
    let actor2 = new Actor('Actor 2', 1)
    actor2.id = 2;
    actor1.type = BattleParticipantType.PLAYER_CHARACTER
    actor2.type = BattleParticipantType.PLAYER_CHARACTER
    let actor3 = new Actor('Monster', 1)
    actor1.setDeathSavingThrowsEligibility(true);
    actor2.setDeathSavingThrowsEligibility(true);
    component.actors = [actor1, actor2, actor3]
    actorServiceSpy.updateCharactersAfterBattle.and.returnValue(of([]))

    // when
    component.endBattle();

    expect(actorServiceSpy.updateCharactersAfterBattle).toHaveBeenCalledOnceWith([{
      playerId: 2,
      playerCurrentHp: 1
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
