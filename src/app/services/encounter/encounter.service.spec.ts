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
    let encounterToAdd = new Encounter('Encounter description', new Map<Monster, number>([
      [MonsterList.WEREWOLF, 5],
      [MonsterList.DEVA, 3],
    ]), 'Encounter description');
    service.addEncounter(encounterToAdd);

    // then
    expect(service.getEncounters()).toEqual([encounterToAdd])
  });

});
