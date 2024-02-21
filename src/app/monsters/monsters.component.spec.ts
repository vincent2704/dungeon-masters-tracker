import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstersComponent } from './monsters.component';
import {MonsterList} from "../models/monsters/monsterList";
import {Settings} from "../services/settings/settings";
import {FormsModule} from "@angular/forms";

describe('MonstersComponent', () => {
  let component: MonstersComponent;
  let fixture: ComponentFixture<MonstersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ MonstersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show monster details', () => {
    let monster = MonsterList.ABOLETH;

    expect(component.showMonsterDetails(monster)).toBeFalse();

    component.toggleDetails(monster);
    expect(component.showMonsterDetails(monster)).toBeTrue();
    component.toggleDetails(monster);
    expect(component.showMonsterDetails(monster)).toBeFalse();
  });

  it('should process basic monster info', () => {
    // 1st case
    let monster = MonsterList.ABOLETH;
    expect(component.getOverview(monster)).toEqual('Large aberration, lawful evil');
    expect(component.getArmorClass(monster)).toEqual('Armor Class: 17 (natural armor)');
    expect(component.getHitPoints(monster)).toEqual('Hit Points: 135 (18d10 + 36)');
    expect(component.getChallenge(monster)).toEqual('Challenge: 10 (5900 XP)');

    // 2nd case
    monster = MonsterList.GOBLIN;
    expect(component.getOverview(monster)).toEqual('Small humanoid (goblinoid), neutral evil');
    expect(component.getArmorClass(monster)).toEqual('Armor Class: 15 (leather armor, shield)');
    expect(component.getHitPoints(monster)).toEqual('Hit Points: 7 (2d6)');
    expect(component.getChallenge(monster)).toEqual('Challenge: 1/4 (50 XP)');

    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 9 m');

    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 30 ft.');

    // 3rd case
    monster = MonsterList.WEREWOLF
    expect(component.getArmorClass(monster)).toEqual('Armor Class: ' +
      '11 in humanoid form, 12 (natural armor) in wolf or hybrid form');
  });

  it('should return speed information', () => {
    let monster = MonsterList.ABOLETH;
    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 3 m, swim 12 m');
    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 10 ft., swim 40 ft.');

    monster = MonsterList.ANKHEG;
    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 9 m, burrow 3 m');
    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 30 ft., burrow 10 ft.');


    monster = MonsterList.WEREWOLF
    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 9 m (12 m in wolf form)')
    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 30 ft. (40 ft. in wolf form)')

    monster = MonsterList.SPECTATOR
    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 0 m, fly 9 m (hover)')
    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 0 ft., fly 30 ft. (hover)')

    monster = MonsterList.GHOST
    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 0 m, fly 12 m (hover)')
    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 0 ft., fly 40 ft. (hover)')
  });

  it('should filter monsters by name case insensitive', () => {
    // given
    component.monsters = [MonsterList.WEREWOLF, MonsterList.ABOLETH, MonsterList.DEVA,
      MonsterList.RUG_OF_SMOTHERING, MonsterList.GOBLIN];
    component.monsterNameActiveFilterString = 'a';

    // when
    let filteredMonsters = component.getMonstersFiltered();

    // then
    expect(filteredMonsters).toEqual([MonsterList.ABOLETH, MonsterList.DEVA]);
  });

});
