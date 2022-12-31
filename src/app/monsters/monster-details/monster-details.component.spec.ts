import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDetailsComponent } from './monster-details.component';
import {MonsterList} from "../../models/monsters/monsterList";
import {Settings} from "../../services/settings/settings";
import {Action} from "../../models/monsters/actions-and-traits/action";

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
    component.monster = MonsterList.ABOLETH;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display resistances', () => {
    component.monster = MonsterList.DEVA;
    expect(component.getDamageResistances()).toEqual('radiant; bludgeoning, piercing, ' +
      'slashing from nonmagical weapons');

    component.monster = MonsterList.GARGOYLE;
    expect(component.getDamageResistances()).toEqual('bludgeoning, piercing, ' +
      'slashing from nonmagical attacks not made with adamantine weapons')
  });

  it('should display immunities', () => {
    component.monster = MonsterList.ANIMATED_ARMOR;
    expect(component.getDamageImmunities()).toEqual('poison, psychic');

    component.monster = MonsterList.WEREWOLF;
    expect(component.getDamageImmunities()).toEqual('bludgeoning, piercing, slashing damage from ' +
      'nonmagical weapons that aren\'t silvered');
  });

  it('should display ability score info', () => {
    let abilityScores = component.monster.getDetails().getAbilitySet().getAbilityScores();

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

    component.monster = MonsterList.WEREWOLF;
    expect(component.getSenses()).toEqual('passive Perception 14');

    component.monster = MonsterList.ANIMATED_ARMOR;
    expect(component.getSenses()).toEqual('Blindsight 18 m (blind beyond this radius), passive Perception 6');
  });

  it('should display languages', () => {
    Settings.setSISystem(true);
    expect(component.getLanguages()).toEqual('Deep Speech, telepathy 36 m');

    component.monster = MonsterList.ANIMATED_ARMOR;
    expect(component.getLanguages()).toEqual('—');

    component.monster = MonsterList.GOBLIN;
    expect(component.getLanguages()).toEqual('Common, Goblin');

    component.monster = MonsterList.WEREWOLF;
    expect(component.getLanguages()).toEqual('Common (can\'t speak in wolf form)');

    component.monster = MonsterList.NIGHTMARE;
    expect(component.getLanguages()).toEqual('understands Abyssal, Common, Infernal but ' +
      'can\'t speak');
  });

  it('should properly display action description', () => {
    // given
    const action1 = Action.ANIMATED_ARMOR_ACTIONS[0]; // multiattack
    const action2 = Action.ANIMATED_ARMOR_ACTIONS[1]; // Slam

    expect(component.getActionDescription(action1)).toEqual('The armor makes two melee attacks.')
    expect(component.getActionDescription(action2)).toEqual('+4 to hit, reach 1.5 m, one target. ' +
      'Hit: 5 (1d6 + 2) bludgeoning damage.')
  });

});
