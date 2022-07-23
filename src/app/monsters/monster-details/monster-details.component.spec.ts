import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDetailsComponent } from './monster-details.component';
import {MonsterManualMonsters} from "../../models/monsters/monsterManualMonsters";

describe('MonsterDetailsComponent', () => {
  let component: MonsterDetailsComponent;
  let fixture: ComponentFixture<MonsterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterDetailsComponent);
    component = fixture.componentInstance;
    component.monster = MonsterManualMonsters.AARAKOCRA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
