import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerComponent } from './tracker.component';
import {Actor} from "../../models/actor";
import {BattleCondition} from "../../models/battleCondition";
import {Condition} from "../../models/Condition";
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "../add-actor/add-actor.component";

describe('TrackerComponent', () => {
  let component: TrackerComponent;
  let fixture: ComponentFixture<TrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TrackerComponent, AddActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it("should not display death saving throws if actor is dead", () => {
    // given
    let actor = new Actor('Actor 1', 1, 1, 3);
    let date = new Date();
    actor.setDeathSavingThrowsEligibility(true);
    actor.kill(date);

    // then
    expect(component.showDeathSavingThrows(actor)).toBeFalse();
  });

});
