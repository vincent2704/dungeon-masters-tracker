// class for testing Actor logic
import {Actor} from "./actor";
import {Condition} from "./Condition";
import {BattleCondition} from "./battleCondition";

describe('Actor', () => {

  it('should add unconscious condition to actor at 0 HP and set them to knocked down', () => {
    let actor = new Actor('Actor Name', 100);
    actor.modifyHp(-100);

    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBeTrue();
    expect(actor.isKnockedDown()).toBeTrue();
  });

  it("should heal and healing should not exceed actor's max HP", () => {
    let actor = new Actor('Actor Name', 20, 18);
    actor.modifyHp(5);
    expect(actor.getCurrentHP()).toEqual(20);
  });

  it("should not modify actor's HP if actor is dead", () => {
    let actor = new Actor('Actor Name', 20, 0);
    actor.kill();

    actor.modifyHp(40);
    expect(actor.getCurrentHP()).toEqual(0);
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

  it('should kill actor not eligible for death saving throws when their HP is 0', () => {
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
    let actor = new Actor('Actor Name', 20, 1);
    actor.modifyHp(-1);
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBeTrue();
    //when
    actor.modifyHp(1);
    //then
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBeFalse();
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
    actor.modifyHp(-4);
    //then
    expect(actor.getCurrentHP()).toEqual(20);
    expect(actor.getTemporaryHitPoints().getHitPoints()).toEqual(1);
  });

  it("should deplete actor's temporary Hit Points first and then deplete actor's true Hit Points", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    actor.setTemporaryHitPoints(5, 3);
    //when
    actor.modifyHp(-7);
    //then
    expect(actor.getCurrentHP()).toEqual(18);
    expect(actor.getTemporaryHitPoints().getHitPoints()).toEqual(0);
  });

  it("should knock down actor if their HP reaches 0", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    //when
    actor.modifyHp(-20);
    //then
    expect(actor.isKnockedDown()).toBeTrue();
  });

  it("should not allow to create actor with maxHP lower than 1", () => {
    //when
    let actor = new Actor('Actor Name', 0);
    //then
    expect(actor.getMaxHP()).toEqual(1);
  });

  it("should not allow to create actor with currentHP lower than 0", () => {
    //given
    let actor = new Actor('Actor Name', 20, -5);
    //then
    expect(actor.getCurrentHP()).toEqual(0);
  });

  it("should not allow set actor's HP to lower than 0", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    //when
    actor.modifyHp(-25);
    //then
    expect(actor.getCurrentHP()).toEqual(0);
  });

  it("should not allow actor to have HP less than 0", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    //when
    actor.modifyHp(-30);
    //then
    expect(actor.getCurrentHP()).toEqual(0);
  });

  it("should remove knocked down state if actor gets healed above 1 HP", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    //when
    actor.modifyHp(-21);
    actor.modifyHp(2);
    //then
    expect(actor.isKnockedDown()).toBeFalse();
  });

  it("should remove stabilized state if actor is hit", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    actor.modifyHp(-20);
    expect(actor.isStabilized()).toBeFalse();
    actor.setStabilized(true);

    //when
    actor.modifyHp(-1);

    //then
    expect(actor.isStabilized()).toBeFalse();
  });

  it("should remove knocked down state if actor is healed above 0 HP", () => {
    // given
    let actor = new Actor('Actor 1', 1);
    actor.modifyHp(-1);
    expect(actor.isKnockedDown()).toBeTrue();

    // when
    actor.modifyHp(1);

    // then
    expect(actor.isKnockedDown()).toBeFalse();
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBeFalse();
  });

  it("should revivify character that has been dead up to 1 minute", () => {
    // given
    expect(true).toBeFalse();
  });

  it("should not revivify character that has been dead for more than 1 minute", () => {
    // given
    expect(true).toBeFalse();
  });

});
