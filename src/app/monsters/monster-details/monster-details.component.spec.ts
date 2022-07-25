import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDetailsComponent } from './monster-details.component';
import {Ability} from "../../models/common/ability/ability";
import {Monster} from "../../models/monsters/monster";
import {MonsterId} from "../../models/monsters/monsterId";
import {MonsterSize} from "../../models/monsters/monsterSize";
import {MonsterType} from "../../models/monsters/enums/monsterType";
import {Alignment} from "../../models/common/alignment";
import {MonsterArmor} from "../../models/monsters/monsterArmor";
import {MonsterEquipment} from "../../models/monsters/enums/monsterEquipment";
import {MonsterHitPoints} from "../../models/monsters/monsterHitPoints";
import {MonsterSpeed} from "../../models/monsters/monsterSpeed";
import {AbilitySet} from "../../models/common/ability/abilitySet";
import {MonsterChallenge} from "../../models/monsters/monsterChallenge";
import {SavingThrow} from "../../models/monsters/savingThrow";
import {MonsterSkill} from "../../models/monsters/monsterSkill";
import {Skill} from "../../models/common/skill";
import {MonsterSenses} from "../../models/monsters/monsterSenses";
import {MonsterSense} from "../../models/monsters/monsterSense";
import {Sense} from "../../models/common/sense";
import {MonsterLanguages} from "../../models/monsters/monsterLanguages";
import {Language} from "../../models/common/language";
import {SpecialTrait} from "../../models/monsters/actions-and-traits/specialTrait";
import {Action} from "../../models/monsters/actions-and-traits/action";
import {LegendaryAction} from "../../models/monsters/actions-and-traits/legendaryAction";
import {MonsterManualMonsters} from "../../models/monsters/monsterManualMonsters";
import {Settings} from "../../services/settings/settings";

describe('MonsterDetailsComponent', () => {
  let component: MonsterDetailsComponent;
  let fixture: ComponentFixture<MonsterDetailsComponent>;

  const aboleth = new Monster(MonsterId.ABOLETH_ID,
    'Aboleth', MonsterSize.LARGE, MonsterType.ABERRATION, [], Alignment.LAWFUL_EVIL,
    new MonsterArmor(17, [MonsterEquipment.NATURAL_ARMOR]), new MonsterHitPoints(135, 18, 10, 36), new MonsterSpeed(10, 0, 40),
    new AbilitySet(21, 9, 15, 18, 15, 18),
    MonsterChallenge.TEN,
    [new SavingThrow(Ability.CONSTITUTION, 6), new SavingThrow(Ability.INTELLIGENCE, 8),
      new SavingThrow(Ability.WISDOM, 6)],
    [new MonsterSkill(Skill.HISTORY, 12), new MonsterSkill(Skill.PERCEPTION, 10)],
    undefined, undefined, [],
    new MonsterSenses([new MonsterSense(Sense.DARKVISION, 120)], [new MonsterSkill(Skill.PERCEPTION, 20)]),
    new MonsterLanguages([Language.DEEP_SPEECH], 120),
    [SpecialTrait.AMPHIBIOUS, SpecialTrait.MUCOUS_CLOUD, SpecialTrait.PROBING_TELEPATHY],
    Action.ABOLETH_ACTIONS, [], LegendaryAction.ABOLETH_LEGENDARY_ACTIONS
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterDetailsComponent);
    component = fixture.componentInstance;
    component.monster = aboleth;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
