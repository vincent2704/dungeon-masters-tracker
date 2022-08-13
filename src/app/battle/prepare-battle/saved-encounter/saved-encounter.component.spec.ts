import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEncounterComponent } from './saved-encounter.component';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {Encounter} from "../../../models/encounter";
import {Monster} from "../../../models/monsters/monster";
import {MonsterList} from "../../../models/monsters/monsterList";
import {FormsModule} from "@angular/forms";

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
    component.encounter = encounter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
