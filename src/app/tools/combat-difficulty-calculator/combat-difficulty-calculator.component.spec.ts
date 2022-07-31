import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatDifficultyCalculatorComponent } from './combat-difficulty-calculator.component';
import {FormsModule} from "@angular/forms";
import {ManualCalculatorComponent} from "./manual-calculator/manual-calculator.component";
import {MonsterListSelectorComponent} from "./monster-list-selector/monster-list-selector.component";

describe('CombatDifficultyCalculatorComponent', () => {
  let component: CombatDifficultyCalculatorComponent;
  let fixture: ComponentFixture<CombatDifficultyCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CombatDifficultyCalculatorComponent, ManualCalculatorComponent, MonsterListSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatDifficultyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
