import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCalculatorComponent } from './manual-calculator.component';
import {FormsModule} from "@angular/forms";
import {Actor} from "../../../models/actors/actor";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {DifficultyBarComponent} from "../difficulty-bar/difficulty-bar.component";
import {PlayerCharacter} from "../../../models/actors/playerCharacter";

describe('ManualCalculatorComponent', () => {
  let component: ManualCalculatorComponent;
  let fixture: ComponentFixture<ManualCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ManualCalculatorComponent, DifficultyBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCalculatorComponent);
    component = fixture.componentInstance;
    component.participatingCharacters = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get difficulty', () => {
    // given
    let actor1: PlayerCharacter = {
      name: '1',
      maxHp: 1,
      level: 3
    }
    let actor2: PlayerCharacter = {
      name: '2',
      maxHp: 2,
      level: 3
    }
    let actor3: PlayerCharacter = {
      name: '3',
      maxHp: 3,
      level: 3
    }
    let actor4: PlayerCharacter = {
      name: '4',
      maxHp: 4,
      level: 2
    }
    // easy - 275 XP, medium - 550 XP, hard - 825 XP, deadly - 1400 XP
    component.participatingCharacters = [actor1, actor2, actor3, actor4]

    component.monsterXp = '500';
    component.monsterCount = '4'

    // when
    component.getDifficulty();

    // then
    expect(component.difficulty).toEqual(Difficulty.HARD);
  });

});
