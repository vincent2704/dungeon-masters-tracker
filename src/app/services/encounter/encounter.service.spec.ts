import { TestBed } from '@angular/core/testing';

import { EncounterService } from './encounter.service';
import {Encounter} from "../../models/encounter";
import {Monster} from "../../models/monsters/monster";
import {MonsterList} from "../../models/monsters/monsterList";

describe('EncounterService', () => {
  let service: EncounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add encounter to the list', () => {
    // given
    expect(service.getEncounters()).toEqual([]);

    // when
    let encounterToAdd = new Encounter('Encounter name', new Map<Monster, number>([
      [MonsterList.WEREWOLF, 5],
      [MonsterList.DEVA, 3],
    ]), 'Encounter description');
    service.addEncounter(encounterToAdd);

    // then
    expect(service.getEncounters()).toEqual([encounterToAdd])
  });

  it('should not add encounter to the list', () => {
    // given
    expect(service.getEncounters()).toEqual([]);

    // when
    let encounter = new Encounter('Encounter name', new Map<Monster, number>([
      [MonsterList.WEREWOLF, 5],
      [MonsterList.DEVA, 3],
    ]), 'Encounter description');
    service.addEncounter(encounter);

    // then
    expect(service.getEncounters()).toEqual([encounter])

    // and when
    let encounterWithTheSameName = new Encounter('Encounter name', new Map<Monster, number>([
      [MonsterList.GOBLIN, 2],
      [MonsterList.GARGOYLE, 3],
    ]), 'Encounter description');
    service.addEncounter(encounterWithTheSameName);

    // then
    expect(service.getEncounters()).toEqual([encounter])
  });

});
