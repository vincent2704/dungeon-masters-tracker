// class for testing Actor logic
import {Actor} from "./actor";
import {Condition} from "./Condition";
import {BattleCondition} from "./battleCondition";
import {TemporaryHP} from "./temporaryHP";

describe('Actor', () => {

  it('should add unconscious condition to actor at 0 HP', () => {
    let actor = new Actor('Actor Name', 100);
    actor.modifyHp(-100);

    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBe(true);
  });

  it("should heal and healing should not exceed actor's max HP", () => {
    let actor = new Actor('Actor Name', 20, 18);
    actor.modifyHp(5);
    expect(actor.getCurrentHP()).toEqual(20)
  });

  it("should not modify actor's HP if actor is dead", () => {
    let actor = new Actor('Actor Name', 20, -20);
    actor.kill();

    actor.modifyHp(40);
    expect(actor.getCurrentHP()).toEqual(-20);
    expect(actor.isDead()).toBeTrue();
  });

  it('should remove all non-magical conditions when death saving throw eligible actor is killed', () => {
    let actor = new Actor('Actor Name', 20, 20);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    actor.addCondition(new BattleCondition(Condition.CHARMED));
    actor.addCondition(new BattleCondition(Condition.STUNNED));
    actor.addCondition(new BattleCondition(Condition.POISONED));
    actor.addCondition(new BattleCondition(Condition.INVISIBLE));
    actor.addCondition(new BattleCondition(Condition.PETRIFIED));
    actor.addCondition(new BattleCondition(Condition.GRAPPLED));
    actor.addCondition(new BattleCondition(Condition.INCAPACITATED));
    actor.kill();

    let actorConditions = actor.getConditions().map(battleCondition => battleCondition.getCondition());
    expect(actorConditions).toEqual(Condition.MAGICAL_CONDITIONS);
  });

  it('should remove all conditions when death saving throw non-eligible actor is killed', () => {
    let actor = new Actor('Actor Name', 20, 20);
    actor.setDeathSavingThrowsEligibility(false);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    actor.addCondition(new BattleCondition(Condition.CHARMED));
    actor.addCondition(new BattleCondition(Condition.STUNNED));
    actor.addCondition(new BattleCondition(Condition.POISONED));
    actor.addCondition(new BattleCondition(Condition.INVISIBLE));
    actor.addCondition(new BattleCondition(Condition.PETRIFIED));
    actor.addCondition(new BattleCondition(Condition.GRAPPLED));
    actor.addCondition(new BattleCondition(Condition.INCAPACITATED));
    actor.kill();

    expect(actor.getConditions().length).toEqual(0);
  });

  it('should kill actor when their HP reaches opposite value of their max HP', () => {
    //given
    let actor = new Actor('Actor Name', 20);
    //when
    actor.modifyHp(-40);
    //then
    expect(actor.isDead()).toEqual(true)
  });

  it('should kill actor not eligible for death saving throws when their HP is 0 or less', () => {
    //given
    let actor = new Actor('Actor Name', 20);
    actor.setDeathSavingThrowsEligibility(false);
    //when
    actor.modifyHp(-20);
    //then
    expect(actor.isDead()).toEqual(true)
  });

  it("should remove unconsciousness when actor's HP raises above 0", () => {
    //given
    let actor = new Actor('Actor Name', 20, 0);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    //when
    actor.modifyHp(1);
    //then
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toEqual(false);
  });

  it("should set actor's HP to 1 when removing unconsciousness triggered by damage", () => {
    //given
    let actor = new Actor('Actor Name', 20, -5);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    //when
    actor.removeCondition(Condition.UNCONSCIOUS);
    //then
    expect(actor.getCurrentHP()).toEqual(1);
  });

  it("should return progressed turn if actor is unconscious", () => {
    //given
    let actor = new Actor('Actor Name', 20, -5);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    //then
    expect(actor.isActorTurnProgressed()).toBeTrue();
  });

  it("should return progressed turn if actor is dead", () => {
    //given
    let actor = new Actor('Actor Name', 20, -5);
    actor.kill();
    //then
    expect(actor.isActorTurnProgressed()).toBeTrue();
  });

  it("should return conditions that the actor is not under state of", () => {
    //given
    let actor = new Actor('Actor Name', 20, 0);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    actor.addCondition(new BattleCondition(Condition.CHARMED));
    actor.addCondition(new BattleCondition(Condition.STUNNED));
    //and
    let expectedConditions = [Condition.BLINDED, Condition.DEAFENED, Condition.FRIGHTENED, Condition.GRAPPLED,
      Condition.INCAPACITATED, Condition.INVISIBLE, Condition.PARALYZED, Condition.PETRIFIED, Condition.POISONED,
      Condition.PRONE, Condition.RESTRAINED, Condition.EXHAUSTION];
    //then
    expect(actor.getAvailableConditions()).toEqual(expectedConditions);
  });

  it("should deplete actor's temporary Hit Points first", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    actor.setTemporaryHitPoints(5, 3);
    //when
    actor.modifyHp(-7);
    //then
    expect(actor.getCurrentHP()).toEqual(18);
    expect(actor.getTemporaryHitPoints().getHitPoints()).toEqual(0);
  });

  it("should set actor's temporary Hit Points to 0 after effect wears off", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    actor.setTemporaryHitPoints(5, 2);
    //when
    actor.progressActor();
    actor.progressActor();
    //then
    expect(actor.getTemporaryHitPoints()).toEqual(new TemporaryHP(0, 0));
  });

});
