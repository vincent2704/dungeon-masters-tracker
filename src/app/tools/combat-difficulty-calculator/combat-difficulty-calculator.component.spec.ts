import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatDifficultyCalculatorComponent } from './combat-difficulty-calculator.component';
import {FormsModule} from "@angular/forms";

describe('CombatDifficultyCalculatorComponent', () => {
  let component: CombatDifficultyCalculatorComponent;
  let fixture: ComponentFixture<CombatDifficultyCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CombatDifficultyCalculatorComponent ]
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
