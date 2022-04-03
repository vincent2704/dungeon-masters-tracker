import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatEncounterComponent } from './combat-encounter.component';

describe('CombatEncounterComponent', () => {
  let component: CombatEncounterComponent;
  let fixture: ComponentFixture<CombatEncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatEncounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
