import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstersComponent } from './monsters.component';
import {MonsterManualMonsters} from "../models/monsters/monsterManualMonsters";
import {Settings} from "../services/settings/settings";

describe('MonstersComponent', () => {
  let component: MonstersComponent;
  let fixture: ComponentFixture<MonstersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    let monster = MonsterManualMonsters.ABOLETH;

    expect(component.showMonster(monster)).toBeFalse();

    component.toggleDetails(monster);
    expect(component.showMonster(monster)).toBeTrue();
    component.toggleDetails(monster);
    expect(component.showMonster(monster)).toBeFalse();
  });

  it('should process basic monster info', () => {
    let monster = MonsterManualMonsters.ABOLETH;
    expect(component.getOverview(monster)).toEqual('Large aberration, lawful evil');
    expect(component.getArmorClass(monster)).toEqual('Armor Class: 17 (natural armor)');
    expect(component.getHitPoints(monster)).toEqual('Hit Points: 135 (18d10 + 36)');
    expect(component.getChallenge(monster)).toEqual('Challenge: 10 (5900XP)');

    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 3 m, swim 12 m');

    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 10 ft., swim 40 ft.');

    monster = MonsterManualMonsters.GOBLIN;
    expect(component.getOverview(monster)).toEqual('Small humanoid (goblinoid), neutral evil');
    expect(component.getArmorClass(monster)).toEqual('Armor Class: 15 (leather armor, shield)');
    expect(component.getHitPoints(monster)).toEqual('Hit Points: 7 (2d6)');
    expect(component.getChallenge(monster)).toEqual('Challenge: 1/4 (50XP)');

    Settings.setSISystem(true);
    expect(component.getSpeed(monster)).toEqual('Speed: 9 m');

    Settings.setSISystem(false);
    expect(component.getSpeed(monster)).toEqual('Speed: 30 ft.');
  });

});
