import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BattleComponent} from './battle.component';
import {PrepareBattleComponent} from "./prepare-battle/prepare-battle.component";
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "./add-actor/add-actor.component";
import {Actor} from "../models/actors/actor";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {
  MonsterBattleListSelectorComponent
} from "./prepare-battle/monster-selector/monster-battle-list-selector.component";
import {DifficultyBarComponent} from "../tools/combat-difficulty-calculator/difficulty-bar/difficulty-bar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BattleService} from "../services/battle/battle.service";

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  let battleServiceSpy: jasmine.SpyObj<BattleService>

  beforeEach(async () => {
    const battleService = jasmine.createSpyObj('BattleService', ['getActorsMap']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [BattleComponent, PrepareBattleComponent, AddActorComponent, MonsterBattleListSelectorComponent, DifficultyBarComponent],
      providers: [
        { provide: BattleService, useValue: battleService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    battleServiceSpy = TestBed.inject(BattleService) as jasmine.SpyObj<BattleService>;
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should sort battle actors by initiative after starting the battle", () => {
    // given
    let actor1 = new Actor('Actor 1', 1)
    let actor2 = new Actor('Actor 2', 1)
    let actor3 = new Actor('Actor 3', 1)

    component.actors = [
      actor1, actor2, actor3
    ];

    component.battleStarted = false;

    battleServiceSpy.getActorsMap.and.returnValue(new Map<Actor, number>([
      [actor1, 1],
      [actor2, 3],
      [actor3, 2]
    ]));

    // when
    component.startBattle()

    expect(component.actors).toEqual([actor2, actor3, actor1])
  });

  it("should add actors to battle component", () => {
    // given
    let prepareBattleDebugElement = findComponent(fixture, PrepareBattleComponent)
    prepareBattleDebugElement.componentInstance.actors = [
      new Actor('Actor 1', 1, 1, 1),
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2)
    ]
    component.battleStarted = false;

    // when
    let newActor = new Actor('New Actor', 10, 10, 4);
    prepareBattleDebugElement.componentInstance.addActor([newActor, 4]);
    component.startBattle();

    // then
    expect(component.actors).toEqual([
      newActor,
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2),
      new Actor('Actor 1', 1, 1, 1)
    ]);
  });

  it("should allow to progress an actor added during battle setup", () => {
    // given
    let prepareBattleDebugElement = findComponent(fixture, PrepareBattleComponent)
    prepareBattleDebugElement.componentInstance.actors = [
      new Actor('Actor 1', 1, 1, 1),
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2)
    ]
    component.battleStarted = false;

    // when
    let newActor = new Actor('New Actor', 10, 10, 4);
    prepareBattleDebugElement.componentInstance.addActor(newActor);
    component.startBattle();

    // then
    expect(component.actors).toEqual([
      newActor,
      new Actor('Actor 2', 1, 1, 3),
      new Actor('Actor 3', 1, 1, 2),
      new Actor('Actor 1', 1, 1, 1)
    ]);
  });

  it("should properly recognize conflicted actors", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    let actor4 = new Actor('Actor 4', 1);

    component.actors = [actor1, actor2, actor3, actor4];
    // component.conflictResolvedActors = [actor3, actor4];
    component.actorsToInitiativeMap= new Map<Actor, number>(
      [
        [actor1, 5],
        [actor2, 5],
        [actor3, 6],
        [actor4, 7]
      ],
    )

    //when
    component.resolveInitiativeConflicts();

    //then
    expect(component.conflictedActors).toEqual([actor1, actor2]);
  });

  it("should clear list of conflict-resolved actors after the end of battle", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 1);
    let actor2 = new Actor('Actor 2', 1, 1, 1);
    let actor3 = new Actor('Actor 3', 1, 1, 1);
    let actor4 = new Actor('Actor 4', 1, 1, 1);
    component.conflictResolvedActors = [actor1, actor2, actor3, actor4];

    battleServiceSpy.getActorsMap.and.returnValue(new Map<Actor, number>([
      [actor1, 1],
      [actor2, 2],
      [actor3, 3],
      [actor4, 4],
    ]))

    component.startBattle();

    //when
    component.endBattle();

    //then
    expect(component.conflictResolvedActors).toEqual([]);
  });


  // TODO: move it to cypress
  // it("should resolve initiative conflicts and return actors in proper order", () => {
  //   // given
  //   let actor1 = new Actor('Actor 1', 1);
  //   let actor2 = new Actor('Actor 2', 1);
  //   let actor3 = new Actor('Actor 3', 1);
  //   let actor4 = new Actor('Actor 4', 1);
  //   let actor5 = new Actor('Actor 5', 1);
  //
  //   component.actors = [actor1, actor2, actor3, actor4, actor5];
  //   battleServiceSpy.getActorsMap.and.returnValue(new Map<Actor, number>([
  //     [actor1, 3], // zywia
  //     [actor2, 3], // dargo
  //     [actor3, 11], // var
  //     [actor4, 20], // thel
  //     [actor5, 1], // fal
  //   ]))
  //   let actorsToPriorityMap = new Map<Actor, number>();
  //   actorsToPriorityMap.set(actor2, 1);
  //   actorsToPriorityMap.set(actor1, 2);
  //   component.conflictedActorsToPriorityOrderNumbersMap = actorsToPriorityMap;
  //
  //   // when
  //   component.startBattle()
  //
  //   expect(component.actors).toEqual([actor4, actor3, actor2, actor1, actor5]);
  // });

});

function findComponent<T>(
  fixture: ComponentFixture<T>,
  directive: any,
): DebugElement {
  return fixture.debugElement.query(By.directive(directive))
}

