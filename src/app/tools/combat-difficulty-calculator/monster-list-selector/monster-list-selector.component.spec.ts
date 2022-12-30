import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonsterListSelectorComponent} from './monster-list-selector.component';
import {MonsterService} from "../../../services/monster/monster.service";
import {MonsterList} from "../../../models/monsters/monsterList";
import {Monster} from "../../../models/monsters/monster";
import {Difficulty} from "../../../models/combat-data/Difficulty";
import {DifficultyBarComponent} from "../difficulty-bar/difficulty-bar.component";
import {FormsModule} from "@angular/forms";
import {EncounterService} from "../../../services/encounter/encounter.service";
import {Encounter} from "../../../models/encounter";
import {PlayerCharacter} from "../../../models/actors/playerCharacter";

describe('MonsterListSelectorComponent', () => {
  let component: MonsterListSelectorComponent;
  let fixture: ComponentFixture<MonsterListSelectorComponent>;

  let monsterServiceSpy: jasmine.SpyObj<MonsterService>
  let encounterServiceSpy: jasmine.SpyObj<EncounterService>

  beforeEach(async () => {
    const monsterService = jasmine.createSpyObj('MonsterService', ['getMonsters'])
    const encounterService = jasmine.createSpyObj('EncounterService', ['addEncounter'])

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MonsterListSelectorComponent, DifficultyBarComponent],
      providers: [
        {provide: MonsterService, useValue: monsterService},
        {provide: EncounterService, useValue: encounterService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterListSelectorComponent);
    component = fixture.componentInstance;
    component.participatingCharacters = [];

    monsterServiceSpy = TestBed.inject(MonsterService) as jasmine.SpyObj<MonsterService>;
    encounterServiceSpy = TestBed.inject(EncounterService) as jasmine.SpyObj<EncounterService>;
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
    component.participatingCharacters = [actor1, actor2, actor3, actor4]

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
    let werewolf = MonsterList.WEREWOLF
    let aboleth = MonsterList.ABOLETH;

    // when
    component.addMonster(werewolf);
    component.addMonster(aboleth);
    component.addMonster(aboleth);
    expect(component.selectedMonsters.get(werewolf)).toEqual(1);
    expect(component.selectedMonsters.get(aboleth)).toEqual(2);
  });

  it('should show monster total XP information', () => {
    // given
    component.selectedMonsters = new Map<Monster, number>()
    expect(component.selectedMonstersTotalXp).toEqual(0);
    let werewolf = MonsterList.WEREWOLF
    let aboleth = MonsterList.ABOLETH;

    // when
    component.addMonster(werewolf);
    component.addMonster(aboleth);
    component.addMonster(aboleth);
    expect(component.selectedMonstersTotalXp).toEqual(12_500);
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

  it('should add encounter', () => {
    // given
    let encounterName = 'Encounter name'
    let selectedMonsters = new Map<Monster, number>([
      [MonsterList.WEREWOLF, 5],
      [MonsterList.DEVA, 3],
    ])
    let encounterDescription = 'Encounter description'

    component.encounterName = encounterName
    component.selectedMonsters = selectedMonsters
    component.encounterDescription = encounterDescription

    // when
    component.onSaveEncounter()

    //then
    expect(component.encounterName).toEqual('');
    expect(component.selectedMonsters.size).toEqual(0);
    expect(component.encounterDescription).toEqual('');
    expect(encounterServiceSpy.addEncounter).toHaveBeenCalledOnceWith(
      new Encounter(
        encounterName,
        // this map is a copy of the selectedMonsters object
        // otherwise empty map would be passed because component monster list is cleared
        new Map<Monster, number>([
          [MonsterList.WEREWOLF, 5],
          [MonsterList.DEVA, 3],
        ]),
        encounterDescription
      )
    )
  });

  it('should not add encounter', () => {
    // given
    let encounterName = ''
    let selectedMonsters = new Map<Monster, number>([
      [MonsterList.WEREWOLF, 5],
      [MonsterList.DEVA, 3],
    ])
    let encounterDescription = 'Encounter description'

    component.encounterName = encounterName
    component.selectedMonsters = selectedMonsters
    component.encounterDescription = encounterDescription

    // when
    component.onSaveEncounter()

    //then
    expect(encounterServiceSpy.addEncounter).not.toHaveBeenCalled()
    expect(component.selectedMonsters).toEqual(selectedMonsters);
    expect(component.encounterDescription).toEqual(encounterDescription);
  });


});
