import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterBattleListSelectorComponent } from './monster-battle-list-selector.component';
import {Actor} from "../../../models/actor";
import {Monster} from "../../../models/monsters/monster";
import {MonsterManualMonsters} from "../../../models/monsters/monsterManualMonsters";
import {Difficulty} from "../../../models/combat-data/Difficulty";

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
    component.participatingActors = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear selected monsters after adding them to battle', () => {
    // given
    component.selectedMonstersCount = new Map<Monster, number>([
      [MonsterManualMonsters.ANIMATED_ARMOR, 2], // 400 XP
      [MonsterManualMonsters.GOBLIN, 2] // 100 XP
    ]);

    // when
    component.addMonstersToBattle()

    // then
    expect(component.selectedMonstersCount.size).toEqual(0);
  });

  it('should get difficulty', () => {
    // given
    let actor1 = new Actor('1', 1)
    actor1.setLevel(3)
    let actor2 =  new Actor('2', 2)
    actor2.setLevel(3)
    let actor3 = new Actor('3', 3)
    actor3.setLevel(3)
    let actor4 = new Actor('4', 4)
    actor4.setLevel(2)
    // easy - 275 XP, medium - 550 XP, hard - 825 XP, deadly - 1400 XP
    component.participatingActors = [actor1, actor2, actor3, actor4]

    // when
    component.selectedMonstersCount = new Map<Monster, number>([
      [MonsterManualMonsters.ANIMATED_ARMOR, 2], // 400 XP
      [MonsterManualMonsters.GOBLIN, 2] // 100 XP
    ]);
    expect(component.getDifficulty()).toEqual(Difficulty.HARD);
  });

  it('should get total number of monster selected', () => {
    // when
    component.selectedMonstersCount = new Map<Monster, number>([
      [MonsterManualMonsters.ANIMATED_ARMOR, 1],
      [MonsterManualMonsters.GOBLIN, 4]
    ]);
    expect(component.getTotalMonstersSelected()).toEqual(5);
  });

  it('should get formatted challenge info for monster', () => {
    let monster = MonsterManualMonsters.AARAKOCRA
    expect(component.getChallenge(monster)).toEqual('1/4 (50 XP)')
  });

  it('should add monster to list', () => {
    // given
    component.selectedMonstersCount = new Map<Monster, number>()
    let aarakocra = MonsterManualMonsters.AARAKOCRA
    let aboleth = MonsterManualMonsters.ABOLETH;

    // when
    component.addMonster(aarakocra);
    component.addMonster(aboleth);
    component.addMonster(aboleth);
    expect(component.selectedMonstersCount.get(aarakocra)).toEqual(1);
    expect(component.selectedMonstersCount.get(aboleth)).toEqual(2);
  });

  it('should remove monster from list', () => {
    // given
    component.selectedMonstersCount = new Map<Monster, number>([
      [MonsterManualMonsters.AARAKOCRA, 2]
    ])
    let monster = MonsterManualMonsters.AARAKOCRA

    // when
    component.subtractMonster(monster);

    // then
    expect(component.selectedMonstersCount.get(monster)).toEqual(1);
    expect(component.selectedMonstersCount.size).toEqual(1);

    // and
    component.subtractMonster(monster)
    expect(component.selectedMonstersCount.size).toEqual(0);
  });

  it('should get monster count for given monster', () => {
    // given
    component.selectedMonstersCount = new Map<Monster, number>([
      [MonsterManualMonsters.AARAKOCRA, 5],
      [MonsterManualMonsters.DEVA, 3],
    ])
    expect(component.getMonsterCount(MonsterManualMonsters.AARAKOCRA)).toEqual(5);
    expect(component.getMonsterCount(MonsterManualMonsters.DEVA)).toEqual(3);
  });

});
