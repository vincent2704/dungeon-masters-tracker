import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BattleComponent} from './battle.component';
import {PrepareBattleComponent} from "./prepare-battle/prepare-battle.component";
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "./add-actor/add-actor.component";
import {Actor} from "../models/actor";

describe('BattleComponent', () => {
  let battleComponent: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BattleComponent, PrepareBattleComponent, AddActorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    battleComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(battleComponent).toBeTruthy();
  });

  it("should properly recognize conflicted actors before opening conflict modal", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 1);
    let actor2 = new Actor('Actor 2', 1, 1, 1);
    let actor3 = new Actor('Actor 3', 1, 1, 2);
    let actor4 = new Actor('Actor 4', 1, 1, 2);

    battleComponent.actors = [actor1, actor2, actor3, actor4];
    battleComponent.conflictResolvedActors = [actor3, actor4];

    //when
    battleComponent.resolveInitiativeConflicts();

    //then
    expect(battleComponent.conflictedActors).toEqual([actor1, actor2]);
  });

  it("should clear list of conflict-resolved actors after the end of battle", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 1);
    let actor2 = new Actor('Actor 2', 1, 1, 1);
    let actor3 = new Actor('Actor 3', 1, 1, 1);
    let actor4 = new Actor('Actor 4', 1, 1, 1);
    battleComponent.conflictResolvedActors = [actor1, actor2, actor3, actor4];
    battleComponent.isBattleStarted = true;

    //when
    battleComponent.changeBattleStatus();

    //then
    expect(battleComponent.conflictedActors).toEqual([]);
  });

  it("should resolve initiative conflicts and return actors in proper order", () => {
    // given
    let actor1 = new Actor('Actor 1', 1, 1, 3);
    let actor2 = new Actor('Actor 2', 1, 1, 3);
    let actor3 = new Actor('Actor 3', 1, 1, 11);
    let actor4 = new Actor('Actor 4', 1, 1, 20);
    let actor5 = new Actor('Actor 5', 1, 1, 1);

    battleComponent.setActors([actor1, actor2, actor3, actor4, actor5]);
    battleComponent.sortActorsByInitiative();

    //and
    let actorsToPriorityMap = new Map<Actor, number>();
    actorsToPriorityMap.set(actor2, 1);
    actorsToPriorityMap.set(actor1, 2);
    battleComponent.conflictedActorsToPriorityOrderNumbersMap = actorsToPriorityMap;
    // remember priority goes reverse way than initiative sorting - from lowest to highest instead of highest to lowest!
    let expectedActors = [actor4, actor3, actor2, actor1, actor5];
    //when
    let sortedActors = battleComponent.getInitiativeConflictResolvedActors();

    //then
    expect(sortedActors).toEqual(expectedActors);
    expect(battleComponent.actors).toEqual(expectedActors);
  });

});
