import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionsComponent } from './monster-actions.component';
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import {Actor} from "../../../models/actors/actor";
import {Action} from "../../../models/monsters/actions-and-traits/action";
import {MonsterList} from "../../../models/monsters/monsterList";

describe('MonsterActionsComponent', () => {
  let component: MonsterActionsComponent;
  let fixture: ComponentFixture<MonsterActionsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ MonsterActionsComponent, NgbTooltip ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterActionsComponent);
    component = fixture.componentInstance;
    component.monsterActor = new Actor('Actor 1', 1);
    component.monsterActor.setMonster(MonsterList.ANIMATED_ARMOR);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should randomize attack roll", () => {
    // given
    component.selectedAction = Action.ANIMATED_ARMOR_ACTIONS[1]; // Slam

    // when
    component.rollAttack()

    // then
    expect(component.attackRollResult).toBeTruthy();
  });

  it("should randomize hit roll", () => {
    // given
    component.selectedAction = Action.ANIMATED_ARMOR_ACTIONS[1]; // Slam
    const roll = component.selectedAction.getDescription().getDamageRolls()[0];

    // when
    component.rollHit(roll, false)

    // then
    // 3 is the lowest possible damage value for this Action
    expect(component.hitRollResult).toBeGreaterThanOrEqual(3);
  });

});
