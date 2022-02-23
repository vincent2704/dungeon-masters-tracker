import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConditionComponent} from './condition.component';
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";
import {Actor} from "../../models/actor";

describe('ConditionComponent', () => {
  let component: ConditionComponent;
  let fixture: ComponentFixture<ConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConditionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionComponent);
    component = fixture.componentInstance;
    component.battleCondition = new BattleCondition(Condition.UNCONSCIOUS);
    component.actor = new Actor('Actor', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show death saving throws", () => {
    let actor = component.actor;
    actor.setDead(false);
    actor.setHP(-5);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    actor.setEligibleForDeathSavingThrows(true);
    expect(component.showDeathSavingThrows()).toBeTrue();
  });

  it("should not show death saving throws", () => {
    let actor = component.actor;
    //case one
    actor.setEligibleForDeathSavingThrows(true);
    actor.setDead(false);
    actor.setHP(3);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    expect(component.showDeathSavingThrows()).toBeFalse();
    //case one
    actor.setEligibleForDeathSavingThrows(false);
    actor.setDead(false);
    actor.setHP(-3);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    expect(component.showDeathSavingThrows()).toBeFalse();
    //case two
    actor.setEligibleForDeathSavingThrows(true);
    actor.setDead(true);
    expect(component.showDeathSavingThrows()).toBeFalse();
    //case three
    actor.setEligibleForDeathSavingThrows(true);
    actor.setDead(false);
    actor.setHP(10);
    actor.removeCondition(Condition.UNCONSCIOUS);
    expect(component.showDeathSavingThrows()).toBeFalse();
  });

});
