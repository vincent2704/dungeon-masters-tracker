import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListSelectorComponent } from './monster-list-selector.component';
import {Monster} from "../../../models/monsters/monster";
import {Actor} from "../../../models/actor";

describe('MonsterListSelectorComponent', () => {
  let component: MonsterListSelectorComponent;
  let fixture: ComponentFixture<MonsterListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterListSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterListSelectorComponent);
    component.participatingActors = [new Actor('Name', 12)];
    component.selectedMonstersCount = new Map<Monster, number>();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should monster count', () => {
    expect(component).toBeTruthy();
  });
});
