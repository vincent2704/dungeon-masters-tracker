import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathSavingThrowsComponent } from './death-saving-throws.component';
import {Actor} from "../../../models/actor";

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
    component.actor = new Actor('Actor', 10, 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set actor's hit points to 1 after 3 successful death saving throws", () => {
    //given
    component.actor.setHP(-3);
    //when
    component.addSuccess();
    component.addSuccess();
    component.addSuccess();
    //then
    expect(component.actor.getCurrentHP()).toEqual(1);
  });

  it("should kill actor on 3 failed death saving throws", () => {
    //when
    component.addFailure();
    component.addFailure();
    component.addFailure();
    //then
    expect(component.actor.isDead()).toBe(true);
  });

});
