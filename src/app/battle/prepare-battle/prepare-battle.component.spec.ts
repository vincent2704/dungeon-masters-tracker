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
import {MonsterList} from "../../models/monsters/monsterList";
import {of} from "rxjs";

describe('PrepareBattleComponent', () => {
  let component: PrepareBattleComponent;
  let fixture: ComponentFixture<PrepareBattleComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  let defaultActors = [
    new Actor('Actor 1', 1),
    new Actor('Actor 2', 2),
    new Actor('Actor 3', 3)
  ];

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getPlayerCharacters']);
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
    actorServiceSpy.getPlayerCharacters.and.returnValue(of(defaultActors));
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

  it('should add monsters from monster list selector to participating actors', () => {
    // given
    component.actors = [];
    let monstersFromList = [
      new Actor('Animated Armor1', MonsterList.ANIMATED_ARMOR.getDetails().getHitPoints().getHitPoints()),
      new Actor('Animated Armor2', MonsterList.ANIMATED_ARMOR.getDetails().getHitPoints().getHitPoints()),
      new Actor('Goblin1', MonsterList.GOBLIN.getDetails().getHitPoints().getHitPoints()),
      new Actor('Goblin2', MonsterList.GOBLIN.getDetails().getHitPoints().getHitPoints()),
    ]

    // when
    component.addMonstersToBattle(monstersFromList);

    // then
    expect(component.actors).toEqual([
      new Actor('Animated Armor1', MonsterList.ANIMATED_ARMOR.getDetails().getHitPoints().getHitPoints()),
      new Actor('Animated Armor2', MonsterList.ANIMATED_ARMOR.getDetails().getHitPoints().getHitPoints()),
      new Actor('Goblin1', MonsterList.GOBLIN.getDetails().getHitPoints().getHitPoints()),
      new Actor('Goblin2', MonsterList.GOBLIN.getDetails().getHitPoints().getHitPoints()),
    ])
  });


});
