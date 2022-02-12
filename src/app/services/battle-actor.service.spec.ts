import {TestBed} from '@angular/core/testing';

import {BattleActorService} from './battle-actor.service';
import {ActorService} from "./actor.service";
import {BattleActor} from "../models/battleActor";
import {PROTAGONISTS} from "../models/actorsData";
import {Condition} from "../models/Condition";
import {BattleCondition} from "../models/battleCondition";

describe('BattleActorService', () => {
  let battleActorService: BattleActorService;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(() => {
    actorServiceSpy = jasmine.createSpyObj('ActorService', ['getProtagonists']);
    actorServiceSpy.getProtagonists.and.returnValue(PROTAGONISTS);
    TestBed.configureTestingModule({
      providers: [
        BattleActorService,
        {provide: ActorService, useValue: actorServiceSpy}
      ]
    });
    battleActorService = TestBed.inject(BattleActorService);
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
  });

  it('should be created', () => {
    expect(battleActorService).toBeTruthy();
  });

  it("should reset battle actors to protagonists", () => {
    // given
    let someBattleActors = [
      new BattleActor('Name 1', 1),
      new BattleActor('Name 2', 2),
      new BattleActor('Name 3', 3),
    ];
    battleActorService.setBattleActors(someBattleActors);
    expect(battleActorService.getBattleActors()).toEqual(someBattleActors);

    let expectedBattleActors = [
      new BattleActor(PROTAGONISTS[0].getName(), PROTAGONISTS[0].getMaxHP()),
      new BattleActor(PROTAGONISTS[1].getName(), PROTAGONISTS[1].getMaxHP()),
      new BattleActor(PROTAGONISTS[2].getName(), PROTAGONISTS[2].getMaxHP()),
      new BattleActor(PROTAGONISTS[3].getName(), PROTAGONISTS[3].getMaxHP()),
    ];

    // when
    battleActorService.resetBattleActors();
    expect(battleActorService.getBattleActors()).toEqual(expectedBattleActors)
  });

  it("should sort battle actors by their initiative", () => {
    // given
    let battleActorsToSort = [
      new BattleActor('Actor 1', 1, 1, 1),
      new BattleActor('Actor 2', 1, 1, 3),
      new BattleActor('Actor 3', 1, 1, 2)
    ];
    battleActorService.setBattleActors(battleActorsToSort);

    // when
    let sortedBattleActors = battleActorService.sortBattleActorsByInitiative();
    expect(sortedBattleActors).toEqual([
      new BattleActor('Actor 2', 1, 1, 3),
      new BattleActor('Actor 3', 1, 1, 2),
      new BattleActor('Actor 1', 1, 1, 1)
    ]);
  });

  it("should return true if all actors have progressed their turn", () => {
    // given
    let battleActor1 = new BattleActor('Actor 1', 1);
    let battleActor2 = new BattleActor('Actor 2', 1);
    let battleActor3 = new BattleActor('Actor 3', 1);
    battleActor1.setActorProgress(true);
    battleActor2.setActorProgress(true);
    battleActor3.setActorProgress(true);
    battleActorService.setBattleActors([battleActor1, battleActor2, battleActor3]);

    expect(battleActorService.allActorsProgressed()).toEqual(true);
  });

  it("should return false if all actors have yet not progressed their turn", () => {
    // given
    let battleActor1 = new BattleActor('Actor 1', 1);
    let battleActor2 = new BattleActor('Actor 2', 1);
    let battleActor3 = new BattleActor('Actor 3', 1);
    battleActor1.setActorProgress(true);
    battleActor2.setActorProgress(true);
    battleActor3.setActorProgress(false);
    battleActorService.setBattleActors([battleActor1, battleActor2, battleActor3]);

    expect(battleActorService.allActorsProgressed()).toEqual(false);
  });

  it("should reset all battle actors' progress", () => {
    // given
    let battleActor1 = new BattleActor('Actor 1', 1);
    let battleActor2 = new BattleActor('Actor 2', 1);
    let battleActor3 = new BattleActor('Actor 3', 1);
    battleActor1.setActorProgress(true);
    battleActor2.setActorProgress(true);
    battleActor3.setActorProgress(true);
    battleActorService.setBattleActors([battleActor1, battleActor2, battleActor3]);

    // when
    battleActorService.resetBattleActorsProgress();

    expect(battleActor1.isActorProgressedInTurn()).toEqual(false);
    expect(battleActor2.isActorProgressedInTurn()).toEqual(false);
    expect(battleActor3.isActorProgressedInTurn()).toEqual(false);
  });

  it("should heal and healing should not exceed actor's max HP", () => {
    let actor = new BattleActor('Actor Name', 20, 18);
    battleActorService.addHP(actor, 5);
    expect(actor.getCurrentHP()).toEqual(20)
  });

  it('should kill actor when their HP reaches opposite value of their max HP', () => {
    let actor = new BattleActor('Actor Name', 20);
    battleActorService.addHP(actor, -40);
    expect(actor.dead).toEqual(true)
  });

  it("should add condition unconscious when actor's HP reaches 0", () => {
    let actor = new BattleActor('Actor Name', 20);
    battleActorService.addHP(actor, -21);
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toEqual(true);
  });

  it("should remove unconsciousness when actor's HP raises above 0", () => {
    let actor = new BattleActor('Actor Name', 20, 0);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));

    battleActorService.addHP(actor, 1);
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toEqual(false);
  });

});
