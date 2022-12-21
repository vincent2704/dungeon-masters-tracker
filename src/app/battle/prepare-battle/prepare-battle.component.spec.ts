import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareBattleComponent } from './prepare-battle.component';
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "../add-actor/add-actor.component";
import {Actor} from "../../models/actors/actor";
import {Settings} from "../../services/settings/settings";
import {By} from "@angular/platform-browser";
import {MonsterBattleListSelectorComponent} from "./monster-selector/monster-battle-list-selector.component";
import {DifficultyBarComponent} from "../../tools/combat-difficulty-calculator/difficulty-bar/difficulty-bar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PrepareBattleComponent', () => {
  let component: PrepareBattleComponent;
  let fixture: ComponentFixture<PrepareBattleComponent>;

  let defaultActors = [
    new Actor('Actor 1', 1),
    new Actor('Actor 2', 2),
    new Actor('Actor 3', 3)
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ PrepareBattleComponent, AddActorComponent, MonsterBattleListSelectorComponent, DifficultyBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    Settings.setAutoLoadProtagonists(true);

    fixture = TestBed.createComponent(PrepareBattleComponent);
    component = fixture.componentInstance;
    component.actors = defaultActors
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render actors to table', () => {
    expect(component.actors).toEqual(defaultActors);

    let tableRows = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableRows.length).toEqual(4);
  });

});
