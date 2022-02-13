import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConditionComponent} from './condition.component';
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
