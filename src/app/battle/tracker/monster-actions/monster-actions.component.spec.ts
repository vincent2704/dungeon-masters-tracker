import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterActionsComponent } from './monster-actions.component';
import {Actor} from "../../../models/actors/actor";
import {Action} from "../../../models/monsters/actions-and-traits/action";
import {MonsterList} from "../../../models/monsters/monsterList";

describe('MonsterActionsComponent', () => {
  let component: MonsterActionsComponent;
  let fixture: ComponentFixture<MonsterActionsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ MonsterActionsComponent ]
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
    const action = Action.ANIMATED_ARMOR_ACTIONS[1]; // Slam
    expect(component.attackRolls.size).toEqual(0);

    const key = 'Slam'

    // when
    component.rollAttack(action)
    component.rollAttack(action)
    component.rollAttack(action)

    // then
    expect(component.attackRolls.size).toEqual(1);
    expect(component.attackRolls.get(key)).toBeTruthy();
    expect(component.attackRolls.get(key)!.length).toBeGreaterThanOrEqual(1);
  });

});
