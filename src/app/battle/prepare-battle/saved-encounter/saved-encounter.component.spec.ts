import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEncounterComponent } from './saved-encounter.component';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {Encounter} from "../../../models/encounter";
import {Monster} from "../../../models/monsters/monster";
import {MonsterList} from "../../../models/monsters/monsterList";
import {FormsModule} from "@angular/forms";
import {Actor} from "../../../models/actors/actor";

describe('SavedEncountersComponent', () => {
  let component: SavedEncounterComponent;
  let fixture: ComponentFixture<SavedEncounterComponent>;

  const encounter = new Encounter('Encounter name',
    new Map<Monster, number>([
      [MonsterList.ZOMBIE, 2],
      [MonsterList.WEREWOLF, 1],
    ]),
    'Encounter description')

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SavedEncounterComponent, NgbCollapse ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEncounterComponent);
    component = fixture.componentInstance;
    spyOn(component.encounterEmitter, 'emit');
    component.encounter = encounter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit encounters', () => {
    // given
    component.encounter = new Encounter('Encounter name', new Map<Monster, number>([
      [MonsterList.WEREWOLF, 2],
      [MonsterList.DEVA, 1],
    ]), 'Encounter description');

    // when
    component.addMonstersToEncounter()

    // then
    let werewolf1 = new Actor('Werewolf1', 58)
    werewolf1.setDeathSavingThrowsEligibility(false);
    let werewolf2 = new Actor('Werewolf2', 58)
    werewolf2.setDeathSavingThrowsEligibility(false);
    let deva1 = new Actor('Deva1', 136)
    deva1.setDeathSavingThrowsEligibility(false);
    expect(component.encounterEmitter.emit).toHaveBeenCalledOnceWith([
      werewolf1, werewolf2, deva1
    ])

  });

});
