import {TestBed} from '@angular/core/testing';

import {BattleActorService} from './battle-actor.service';
import {ActorService} from "./actor.service";
import {BattleActor} from "../models/battleActor";
import {PROTAGONISTS} from "../models/actorsData";
import {Condition} from "../models/Condition";

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

  it("should heal and healing should not exceed actor's max HP", () => {
    let actor = new BattleActor('Actor Name', 20, 18);
    battleActorService.addHP(actor, 5);
    expect(actor.getCurrentHP()).toEqual(20)
  });

  it('should kill actor when their HP reaches opposite value of their max HP',() => {
    let actor = new BattleActor('Actor Name', 20);
    battleActorService.addHP(actor, -40);
    expect(actor.dead).toEqual(true)
  });

  it("should add condition unconscious when actor's HP reaches 0",() => {
    let actor = new BattleActor('Actor Name', 20);
    battleActorService.addHP(actor, -21);
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toEqual(true);
  });

  it("should remove unconsciousness when actor's HP raises above 0",() => {
    let actor = new BattleActor('Actor Name', 20, 0);
    actor.addCondition(Condition.UNCONSCIOUS);

    battleActorService.addHP(actor, 1);
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toEqual(false);
  });

});
