import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterBattleListSelectorComponent } from './monster-battle-list-selector.component';
import {Monster} from "../../../models/monsters/monster";
import {MonsterList} from "../../../models/monsters/monsterList";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {
  DifficultyBarComponent
} from "../../../tools/combat-difficulty-calculator/difficulty-bar/difficulty-bar.component";
import { FormsModule } from "@angular/forms";
import {PlayerCharacter} from "../../../models/actors/playerCharacter";

describe('MonsterSelectorComponent', () => {
  let component: MonsterBattleListSelectorComponent;
  let fixture: ComponentFixture<MonsterBattleListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ MonsterBattleListSelectorComponent, DifficultyBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterBattleListSelectorComponent);
    component = fixture.componentInstance;
    component.playerCharacters = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear selected monsters after adding them to battle', () => {
    // given
    component.selectedMonsters = new Map<Monster, number>([
      [MonsterList.ANIMATED_ARMOR, 2], // 400 XP
      [MonsterList.GOBLIN, 2] // 100 XP
    ]);

    // when
    component.addMonstersToBattle()

    // then
    expect(component.selectedMonsters.size).toEqual(0);
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
    component.playerCharacters = [actor1, actor2, actor3, actor4]

    component.addMonster(MonsterList.ANIMATED_ARMOR)
    component.addMonster(MonsterList.ANIMATED_ARMOR)
    component.addMonster(MonsterList.GOBLIN)
    component.addMonster(MonsterList.GOBLIN)

    // when
    component.selectedMonsters = new Map<Monster, number>([
      [MonsterList.ANIMATED_ARMOR, 2], // 400 XP
      [MonsterList.GOBLIN, 2] // 100 XP
    ]);
    expect(component.getDifficulty()).toEqual(Difficulty.HARD);
  });

  it('should get total number of monster selected', () => {
    // when
    component.selectedMonsters = new Map<Monster, number>([
      [MonsterList.ANIMATED_ARMOR, 1],
      [MonsterList.GOBLIN, 4]
    ]);
    expect(component.getTotalMonstersSelected()).toEqual(5);
  });

  it('should get formatted challenge info for monster', () => {
    let monster = MonsterList.WEREWOLF
    expect(component.getChallenge(monster)).toEqual('3 (700 XP)')
  });

  it('should add monster to list', () => {
    // given
    component.selectedMonsters = new Map<Monster, number>()
    let aarakocra = MonsterList.WEREWOLF
    let aboleth = MonsterList.ABOLETH;

    // when
    component.addMonster(aarakocra);
    component.addMonster(aboleth);
    component.addMonster(aboleth);
    expect(component.selectedMonsters.get(aarakocra)).toEqual(1);
    expect(component.selectedMonsters.get(aboleth)).toEqual(2);
  });

  it('should remove monster from list', () => {
    // given
    component.selectedMonsters = new Map<Monster, number>([
      [MonsterList.WEREWOLF, 2]
    ])
    let monster = MonsterList.WEREWOLF

    // when
    component.subtractMonster(monster);

    // then
    expect(component.selectedMonsters.get(monster)).toEqual(1);
    expect(component.selectedMonsters.size).toEqual(1);

    // and
    component.subtractMonster(monster)
    expect(component.selectedMonsters.size).toEqual(0);
  });

  it('should get monster count for given monster', () => {
    // given
    component.selectedMonsters = new Map<Monster, number>([
      [MonsterList.WEREWOLF, 5],
      [MonsterList.DEVA, 3],
    ])
    expect(component.getMonsterCount(MonsterList.WEREWOLF)).toEqual(5);
    expect(component.getMonsterCount(MonsterList.DEVA)).toEqual(3);
  });

});
