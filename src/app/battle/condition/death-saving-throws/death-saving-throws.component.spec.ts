import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathSavingThrowsComponent } from './death-saving-throws.component';
import {Actor} from "../../../models/actor";
import {Condition} from "../../../models/Condition";

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
    component.actor.modifyHp(-1);
    //when
    component.addSuccess();
    component.addSuccess();
    component.addSuccess();
    //then
    expect(component.actor.getCurrentHP()).toEqual(0);
    expect(component.actor.isKnockedDown()).toBeTrue();
    expect(component.actor.isStabilized()).toBeTrue();
  });

  it("should NOT remove unconsciousness on successful death saving throws", () => {
    //given
    component.actor.modifyHp(-1);
    //when
    component.addSuccess();
    component.addSuccess();
    component.addSuccess();
    //then
    expect(component.actor.hasCondition(Condition.UNCONSCIOUS)).toBeTrue();
  });

  it("should kill actor on 3 failed death saving throws", () => {
    //given
    component.actor.modifyHp(-1);
    //when
    component.addFailure();
    component.addFailure();
    component.addFailure();
    //then
    expect(component.actor.isDead()).toBeTrue();
    expect(component.actor.getCurrentHP()).toEqual(0);
  });

});
