import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BattleComponent} from './battle.component';
import {PrepareBattleComponent} from "./prepare-battle/prepare-battle.component";
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "./add-actor/add-actor.component";
import {Actor} from "../models/actor";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {BattleCondition} from "../models/battleCondition";
import {Condition} from "../models/Condition";

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BattleComponent, PrepareBattleComponent, AddActorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should sort battle actors by initiative after starting the battle", () => {
    // given
    let prepareBattleDebugElement = findComponent(fixture, PrepareBattleComponent)
    prepareBattleDebugElement.componentInstance.actors = [
      new Actor('Actor 1', 1, 1, 1),
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2)
    ]
    component.isBattleStarted = false;

    // when
    component.changeBattleStatus();

    // then
    expect(component.actors).toEqual([
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2),
      new Actor('Actor 1', 1, 1, 1)
    ]);
  });

  it("should sort battle actors by their initiative", () => {
    // given
    component.actors = [
      new Actor('Actor 1', 1, 1, 1),
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2)
    ];

    // when
    let sortedActors = component.sortActorsByInitiative();
    expect(sortedActors).toEqual([
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2),
      new Actor('Actor 1', 1, 1, 1)
    ]);
  });

  it("should add actors to battle component", () => {
    // given
    let prepareBattleDebugElement = findComponent(fixture, PrepareBattleComponent)
    prepareBattleDebugElement.componentInstance.actors = [
      new Actor('Actor 1', 1, 1, 1),
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2)
    ]
    component.isBattleStarted = false;

    // when
    let newActor = new Actor('New Actor', 10, 10, 4);
    prepareBattleDebugElement.componentInstance.addActor(newActor);
    component.changeBattleStatus();

    // then
    expect(component.actors).toEqual([
      newActor,
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2),
      new Actor('Actor 1', 1, 1, 1)
    ]);
  });

  it("should allow to progress an actor added during battle setup", () => {
    // given
    let prepareBattleDebugElement = findComponent(fixture, PrepareBattleComponent)
    prepareBattleDebugElement.componentInstance.actors = [
      new Actor('Actor 1', 1, 1, 1),
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2)
    ]
    component.isBattleStarted = false;

    // when
    let newActor = new Actor('New Actor', 10, 10, 4);
    prepareBattleDebugElement.componentInstance.addActor(newActor);
    component.changeBattleStatus();

    // then
    expect(component.actors).toEqual([
      newActor,
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2),
      new Actor('Actor 1', 1, 1, 1)
    ]);

    // and when
    component.progressActor(newActor);
    expect(component.progressedActors).toEqual([newActor]);
  });

  it("should properly recognize conflicted actors before opening conflict modal", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 1);
    let actor2 = new Actor('Actor 2', 1, 1, 1);
    let actor3 = new Actor('Actor 3', 1, 1, 2);
    let actor4 = new Actor('Actor 4', 1, 1, 2);

    component.actors = [actor1, actor2, actor3, actor4];
    component.conflictResolvedActors = [actor3, actor4];

    //when
    component.resolveInitiativeConflicts();

    //then
    expect(component.conflictedActors).toEqual([actor1, actor2]);
  });

  it("should clear list of conflict-resolved actors after the end of battle", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 1);
    let actor2 = new Actor('Actor 2', 1, 1, 1);
    let actor3 = new Actor('Actor 3', 1, 1, 1);
    let actor4 = new Actor('Actor 4', 1, 1, 1);
    component.conflictResolvedActors = [actor1, actor2, actor3, actor4];
    component.isBattleStarted = true;

    //when
    component.changeBattleStatus();

    //then
    expect(component.conflictedActors).toEqual([]);
  });

  it("should resolve initiative conflicts and return actors in proper order", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 3);
    let actor2 = new Actor('Actor 2', 1, 1, 3);
    let actor3 = new Actor('Actor 3', 1, 1, 11);
    let actor4 = new Actor('Actor 4', 1, 1, 20);
    let actor5 = new Actor('Actor 5', 1, 1, 1);

    component.actors = [actor1, actor2, actor3, actor4, actor5];
    component.sortActorsByInitiative();

    //and
    let actorsToPriorityMap = new Map<Actor, number>();
    actorsToPriorityMap.set(actor2, 1);
    actorsToPriorityMap.set(actor1, 2);
    component.conflictedActorsToPriorityOrderNumbersMap = actorsToPriorityMap;
    // remember priority goes reverse way than initiative sorting - from lowest to highest instead of highest to lowest!
    let expectedActors = [actor4, actor3, actor2, actor1, actor5];
    //when
    let sortedActors = component.getInitiativeConflictResolvedActors();

    //then
    expect(sortedActors).toEqual(expectedActors);
    expect(component.actors).toEqual(expectedActors);
  });

  it("should increment round after all actors are progressed", () => {
    // given
    expect(component.round).toEqual(1);
    let actor1 = new Actor('Actor 1', 1, 1, 3);
    let actor2 = new Actor('Actor 2', 1, 1, 3);
    let actor3 = new Actor('Actor 3', 1, 1, 11);
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
    let actor1 = new Actor('Actor 1', 1, 1, 3);
    component.actors = [actor1];

    // when
    actor1.setTemporaryHitPoints(10, 3);
    component.progressActor(actor1);

    // then
    expect(actor1.getTemporaryHitPoints().getTurnsLeft()).toEqual(2);
  });

  it("should decrement actor's condition duration after the end of actor's turn", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 3);
    let actor2 = new Actor('Actor 1', 1, 1, 1);
    component.actors = [actor1, actor2];

    // when
    actor1.addCondition(new BattleCondition(Condition.BLINDED, 2));
    component.progressActor(actor1);
    component.progressActor(actor2);

    // then
    expect(actor1.getConditions()[0].getDurationInTurns()).toEqual(1);
    expect(actor2.getConditions()).toEqual([]);
  });

});

function findComponent<T>(
  fixture: ComponentFixture<T>,
  directive: any,
): DebugElement {
  return fixture.debugElement.query(By.directive(directive))
}

