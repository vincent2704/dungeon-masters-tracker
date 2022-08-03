import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListSelectorComponent } from './monster-list-selector.component';
import {MonsterService} from "../../../services/monster/monster.service";
import {MonsterManualMonsters} from "../../../models/monsters/monsterManualMonsters";
import {Monster} from "../../../models/monsters/monster";
import {Actor} from "../../../models/actor";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {DifficultyBarComponent} from "../difficulty-bar/difficulty-bar.component";

describe('MonsterListSelectorComponent', () => {
  let component: MonsterListSelectorComponent;
  let fixture: ComponentFixture<MonsterListSelectorComponent>;
  let monsterServiceSpy: jasmine.SpyObj<MonsterService>

  beforeEach(async () => {
    const monsterService = jasmine.createSpyObj('MonsterService', ['getMonsters'])

    await TestBed.configureTestingModule({
      declarations: [ MonsterListSelectorComponent, DifficultyBarComponent ],
      providers: [
        {provide: MonsterService, useValue: monsterService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterListSelectorComponent);
    component = fixture.componentInstance;
    component.participatingActors = [];

    monsterServiceSpy = TestBed.inject(MonsterService) as jasmine.SpyObj<MonsterService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
