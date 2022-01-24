import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';

describe('BattleComponent', () => {
  let battleComponent: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    battleComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(battleComponent).toBeTruthy();
  });
});
