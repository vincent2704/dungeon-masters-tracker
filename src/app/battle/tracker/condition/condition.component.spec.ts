import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConditionComponent} from './condition.component';
import {Actor} from "../../../models/actors/actor";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Condition} from "../../../models/Condition";
import {BattleCondition} from "../../../models/battleCondition";

describe('ConditionComponent', () => {
  let component: ConditionComponent;
  let fixture: ComponentFixture<ConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ConditionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionComponent);
    component = fixture.componentInstance;
    component.actor = new Actor('Actor', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when adding exhaustion during battle, sets level to 1 as minimum', () => {
    component.conditionToAdd = Condition.EXHAUSTION;
    component.onSubmitCondition(component.actor);
    expect(component.actor.battleConditions[0])
      .toEqual(new BattleCondition(Condition.EXHAUSTION, 0, 1))
  });

});
