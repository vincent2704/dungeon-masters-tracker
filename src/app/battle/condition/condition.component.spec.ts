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
    actor.resurrect();
    actor.setHP(-5);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    actor.setDeathSavingThrowsEligibility(true);
    expect(component.showDeathSavingThrows()).toBeTrue();
  });

  it("should not show death saving throws", () => {
    let actor = component.actor;
    //case one
    actor.setDeathSavingThrowsEligibility(true);
    actor.resurrect();
    actor.setHP(3);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    expect(component.showDeathSavingThrows()).toBeFalse();
    //case one
    actor.setDeathSavingThrowsEligibility(false);
    actor.resurrect();
    actor.setHP(-3);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    expect(component.showDeathSavingThrows()).toBeFalse();
    //case two
    actor.setDeathSavingThrowsEligibility(true);
    actor.kill();
    expect(component.showDeathSavingThrows()).toBeFalse();
    //case three
    actor.setDeathSavingThrowsEligibility(true);
    actor.resurrect();
    actor.setHP(10);
    actor.removeCondition(Condition.UNCONSCIOUS);
    expect(component.showDeathSavingThrows()).toBeFalse();
  });

});
