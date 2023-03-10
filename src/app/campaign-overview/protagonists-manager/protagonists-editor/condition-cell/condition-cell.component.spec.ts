import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionCellComponent } from './condition-cell.component';
import {PlayerCharacter} from "../../../../models/actors/playerCharacter";

describe('ConditionCellComponent', () => {
  let component: ConditionCellComponent;
  let fixture: ComponentFixture<ConditionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionCellComponent ]
    })
    .compileComponents();

    component.playerCharacter = {
      name: 'Player'
    } as PlayerCharacter
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
