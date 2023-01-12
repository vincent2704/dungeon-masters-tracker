import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleConditionComponent } from './single-condition.component';
import {BattleCondition} from "../../../../models/battleCondition";
import {Condition} from "../../../../models/Condition";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

describe('ConditionTooltipComponent', () => {
  let component: SingleConditionComponent;
  let fixture: ComponentFixture<SingleConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleConditionComponent, NgbTooltip ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleConditionComponent);
    component = fixture.componentInstance;
    component.condition = new BattleCondition(Condition.EXHAUSTION);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment exhaustion level', () => {
    component.condition.setExhaustionLevel(4);
    component.incrementExhaustionLevel();
    expect(component.condition.getExhaustionLevel()).toEqual(5);

    spyOn(component.actorDeathEmitter, 'emit');
    component.incrementExhaustionLevel();
    expect(component.condition.getExhaustionLevel()).toEqual(6);
    expect(component.actorDeathEmitter.emit).toHaveBeenCalled();
  });

  it('should decrement exhaustion level', () => {
    component.condition.setExhaustionLevel(2);
    component.decrementExhaustionLevel();
    expect(component.condition.getExhaustionLevel()).toEqual(1);

    spyOn(component.conditionRemovedEmitter, 'emit');
    component.decrementExhaustionLevel();
    expect(component.conditionRemovedEmitter.emit).toHaveBeenCalled();
  });

});
