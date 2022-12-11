import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatDifficultyCalculatorComponent } from './combat-difficulty-calculator.component';
import {FormsModule} from "@angular/forms";
import {ManualCalculatorComponent} from "./manual-calculator/manual-calculator.component";
import {MonsterListSelectorComponent} from "./monster-list-selector/monster-list-selector.component";
import {DifficultyBarComponent} from "./difficulty-bar/difficulty-bar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CombatDifficultyCalculatorComponent', () => {
  let component: CombatDifficultyCalculatorComponent;
  let fixture: ComponentFixture<CombatDifficultyCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ CombatDifficultyCalculatorComponent, ManualCalculatorComponent, MonsterListSelectorComponent, DifficultyBarComponent ]
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
