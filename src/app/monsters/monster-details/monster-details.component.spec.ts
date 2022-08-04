import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDetailsComponent } from './monster-details.component';
import {MonsterManualMonsters} from "../../models/monsters/monsterManualMonsters";
import {Settings} from "../../services/settings/settings";

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
    component.monster = MonsterManualMonsters.ABOLETH;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display resistances', () => {
    component.monster = MonsterManualMonsters.DEVA;
    expect(component.getDamageResistances()).toEqual('radiant; bludgeoning, piercing, ' +
      'slashing from nonmagical weapons');
  });

  it('should display immunities', () => {
    component.monster = MonsterManualMonsters.ANIMATED_ARMOR;
    expect(component.getDamageImmunities()).toEqual('poison, psychic');

    component.monster = MonsterManualMonsters.WEREWOLF;
    expect(component.getDamageImmunities()).toEqual('bludgeoning, piercing, slashing damage from ' +
      'nonmagical weapons that aren\'t silvered');
    expect(component.getLanguages()).toEqual('Common (can\'t speak in wolf form)');
  });

  it('should display ability score info', () => {
    let abilityScores = component.monster.getAbilitySet().getAbilityScores();

    expect(component.getAbilityScoreInfo(abilityScores[0])).toEqual('21 (+5)');
    expect(component.getAbilityScoreInfo(abilityScores[1])).toEqual('9 (-1)');
    expect(component.getAbilityScoreInfo(abilityScores[2])).toEqual('15 (+2)');
    expect(component.getAbilityScoreInfo(abilityScores[3])).toEqual('18 (+4)');
    expect(component.getAbilityScoreInfo(abilityScores[4])).toEqual('15 (+2)');
    expect(component.getAbilityScoreInfo(abilityScores[5])).toEqual('18 (+4)');
  });

  it('should display senses', () => {
    Settings.setSISystem(true);
    expect(component.getSenses()).toEqual('Darkvision 36 m, passive Perception 20');

    component.monster = MonsterManualMonsters.AARAKOCRA;
    expect(component.getSenses()).toEqual('passive Perception 15');

    component.monster = MonsterManualMonsters.ANIMATED_ARMOR;
    expect(component.getSenses()).toEqual('Blindsight 18 m (blind beyond this radius), passive Perception 6');
  });

  it('should display languages', () => {
    Settings.setSISystem(true);
    expect(component.getLanguages()).toEqual('Deep Speech, telepathy 36 m');

    component.monster = MonsterManualMonsters.ANIMATED_ARMOR;
    expect(component.getLanguages()).toEqual('—');

    component.monster = MonsterManualMonsters.GOBLIN;
    expect(component.getLanguages()).toEqual('Common, Goblin');
  });

});
