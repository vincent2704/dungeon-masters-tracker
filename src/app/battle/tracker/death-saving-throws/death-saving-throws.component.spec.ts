import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeathSavingThrowsComponent} from './death-saving-throws.component';
import {Actor} from "../../../models/actor";
import {Condition} from "../../../models/Condition";
import {HitType} from "../../../models/combat-data/HitType";

describe('DeathSavingThrowsComponent', () => {
  let component: DeathSavingThrowsComponent;
  let fixture: ComponentFixture<DeathSavingThrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathSavingThrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathSavingThrowsComponent);
    component = fixture.componentInstance;
    component.actor = new Actor('Actor', 10, 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should stabilize actor after 3 successful death saving throws", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    let date = new Date();
    component.actor.modifyHp(-1, date);
    //when
    component.success();
    component.success();
    component.success();
    //then
    expect(component.actor.getCurrentHP()).toEqual(0);
    expect(component.actor.isKnockedDown()).toBeTrue();
    expect(component.actor.isStabilized()).toBeTrue();
  });

  it("should NOT remove unconsciousness on successful death saving throws", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    let date = new Date();
    component.actor.modifyHp(-1, date);
    //when
    component.success();
    component.success();
    component.success();
    //then
    expect(component.actor.hasCondition(Condition.UNCONSCIOUS)).toBeTrue();
    expect(component.actor.getCurrentHP()).toEqual(0);
  });

  it("should kill actor on 3 failed death saving throws", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    let date = new Date();
    component.actor.modifyHp(-1, date);
    //when
    component.failure();
    component.failure();
    component.failure();
    //then
    expect(component.actor.isDead()).toBeTrue();
    expect(component.actor.getCurrentHP()).toEqual(0);
  });

  it("should add 2 failures and kill actor on rolled 1", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    let date = new Date();
    component.actor.modifyHp(-1, date);
    //when
    component.failure();
    component.failure();
    expect(component.failures).toEqual(2);
    //and
    component.criticalFail();
    //then
    expect(component.actor.isDead()).toBeTrue();
  });

  it("should immediately rise actor after rolled 20", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    let date = new Date();
    component.actor.modifyHp(-1, date);
    //when
    component.criticalSuccess()
    //then
    expect(component.actor.isKnockedDown()).toBeFalse();
    expect(component.actor.getCurrentHP()).toEqual(1);
    expect(component.actor.hasCondition(Condition.UNCONSCIOUS)).toBeFalse();
  });

  it("should break stabilized state when unconscious character with 0 HP gets hit", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    component.actor.modifyHp(-1, new Date());
    component.actor.setStabilized(true);

    //when
    component.actor.modifyHp(-1, new Date());

    //then
    expect(component.actor.isStabilized()).toBeFalse();
  });


  it("should call death saving throw fail when unconscious character receives normal hit", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    component.actor.modifyHp(-1, new Date());

    //when
    component.onDamageReceived(HitType.NORMAL_HIT)

    //then
    expect(component.failures).toEqual(1);
  });

  it("should call death saving throw fail when unconscious character receives critical hit", () => {
    //given
    component.actor = new Actor('Actor', 10, 1);
    component.actor.modifyHp(-1, new Date());

    //when
    component.onDamageReceived(HitType.CRITICAL_HIT)

    //then
    expect(component.failures).toEqual(2);
  });

});
