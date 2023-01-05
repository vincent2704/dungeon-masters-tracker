import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingThrowsComponent } from './saving-throws.component';
import {AbilityScore} from "../../../models/common/ability/abilityScore";
import {Ability} from "../../../models/common/ability/ability";
import {AbilitySet} from "../../../models/common/ability/abilitySet";

describe('SavingThrowsComponent', () => {
  let component: SavingThrowsComponent;
  let fixture: ComponentFixture<SavingThrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingThrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingThrowsComponent);
    component = fixture.componentInstance;
    component.abilitySet = new AbilitySet(10, 10, 10, 10, 10, 10)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return ability score information', () => {
    // given
    const abilityScore1 = new AbilityScore(Ability.WISDOM, 15)
    const abilityScore2 = new AbilityScore(Ability.STRENGTH, 9)
    const abilityScore3 = new AbilityScore(Ability.DEXTERITY, 10)

    // when
    const result1 = component.getAbilityInfo(abilityScore1);
    const result2 = component.getAbilityInfo(abilityScore2);
    const result3 = component.getAbilityInfo(abilityScore3);

    // then
    expect(result1).toEqual('15 (+2)')
    expect(result2).toEqual('9 (-1)')
    expect(result3).toEqual('10 (+0)')
  });

});
