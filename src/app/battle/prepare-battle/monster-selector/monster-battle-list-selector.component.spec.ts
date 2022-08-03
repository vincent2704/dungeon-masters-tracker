import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterBattleListSelectorComponent } from './monster-battle-list-selector.component';

describe('MonsterSelectorComponent', () => {
  let component: MonsterBattleListSelectorComponent;
  let fixture: ComponentFixture<MonsterBattleListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterBattleListSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterBattleListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
