import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareBattleComponent } from './prepare-battle.component';
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "../add-actor/add-actor.component";
import {ActorService} from "../../services/actor/actor.service";
import {Actor} from "../../models/actors/actor";
import {Settings} from "../../services/settings/settings";
import {By} from "@angular/platform-browser";
import {MonsterBattleListSelectorComponent} from "./monster-selector/monster-battle-list-selector.component";
import {DifficultyBarComponent} from "../../tools/combat-difficulty-calculator/difficulty-bar/difficulty-bar.component";
import {of} from "rxjs";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

describe('PrepareBattleComponent', () => {
  let component: PrepareBattleComponent;
  let fixture: ComponentFixture<PrepareBattleComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  let defaultPlayerCharacters: PlayerCharacter[] = [
    {
     name: 'Actor 1',
     level: 1,
     maxHp: 1,
     currentHp: 1
    } as PlayerCharacter,
    {
      name: 'Actor 2',
      level: 1,
      maxHp: 2,
      currentHp: 2
    } as PlayerCharacter,
    {
      name: 'Actor 3',
      level: 1,
      maxHp: 3,
      currentHp: 3
    } as PlayerCharacter
  ]
  let defaultActors = [
    new Actor('Actor 1', 1),
    new Actor('Actor 2', 2),
    new Actor('Actor 3', 3)
  ];

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getPlayerCharacters2']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PrepareBattleComponent, AddActorComponent, MonsterBattleListSelectorComponent, DifficultyBarComponent ],
      providers: [
        { provide: ActorService, useValue: actorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    actorServiceSpy.getPlayerCharacters2.and.returnValue(of(defaultPlayerCharacters));
    Settings.setAutoLoadProtagonists(true);

    fixture = TestBed.createComponent(PrepareBattleComponent);
    component = fixture.componentInstance;
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
