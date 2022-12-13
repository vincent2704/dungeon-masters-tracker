// class for testing Actor logic
import {Actor} from "./actor";
import {Condition} from "../Condition";
import {BattleCondition} from "../battleCondition";

describe('Actor', () => {

  it('should add unconscious condition to actor at 0 HP and set them to knocked down', () => {
    let actor = new Actor('Actor Name', 100);
    let date = new Date();
    actor.modifyHp(-100, date);

    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBeTrue();
    expect(actor.isKnockedDown()).toBeTrue();
  });

  it("should heal and healing should not exceed actor's max HP", () => {
    let actor = new Actor('Actor Name', 20, 18);
    let date = new Date();
    actor.modifyHp(5, date);
    expect(actor.getCurrentHP()).toEqual(20);
  });

  it("should not modify actor's HP if actor is dead", () => {
    let actor = new Actor('Actor Name', 20, 0);
    let date = new Date();
    actor.kill(date);

    actor.modifyHp(40, date);
    expect(actor.getCurrentHP()).toEqual(0);
    expect(actor.isDead()).toBeTrue();
  });

  it('should remove all non-magical conditions when death saving throw eligible actor is killed', () => {
    let actor = new Actor('Actor Name', 20, 20);
    let date = new Date();
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    actor.addCondition(new BattleCondition(Condition.CHARMED));
    actor.addCondition(new BattleCondition(Condition.STUNNED));
    actor.addCondition(new BattleCondition(Condition.POISONED));
    actor.addCondition(new BattleCondition(Condition.INVISIBLE));
    actor.addCondition(new BattleCondition(Condition.PETRIFIED));
    actor.addCondition(new BattleCondition(Condition.GRAPPLED));
    actor.addCondition(new BattleCondition(Condition.INCAPACITATED));
    actor.kill(date);

    let actorConditions = actor.getConditions().map(battleCondition => battleCondition.getCondition());
    expect(actorConditions).toEqual(Condition.MAGICAL_CONDITIONS);
  });

  it('should remove all conditions when death saving throw non-eligible actor is killed', () => {
    let actor = new Actor('Actor Name', 20, 20);
    let date = new Date();
    actor.setDeathSavingThrowsEligibility(false);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
    actor.addCondition(new BattleCondition(Condition.CHARMED));
    actor.addCondition(new BattleCondition(Condition.STUNNED));
    actor.addCondition(new BattleCondition(Condition.POISONED));
    actor.addCondition(new BattleCondition(Condition.INVISIBLE));
    actor.addCondition(new BattleCondition(Condition.PETRIFIED));
    actor.addCondition(new BattleCondition(Condition.GRAPPLED));
    actor.addCondition(new BattleCondition(Condition.INCAPACITATED));
    actor.kill(date);

    expect(actor.getConditions().length).toEqual(0);
  });

  it('should kill actor when their HP reaches opposite value of their max HP', () => {
    //given
    let actor = new Actor('Actor Name', 20);
    let date = new Date();
    //when
    actor.modifyHp(-40, date);
    //then
    expect(actor.isDead()).toEqual(true)
  });

  it('should kill actor not eligible for death saving throws when their HP is 0', () => {
    //given
    let actor = new Actor('Actor Name', 20);
    actor.setDeathSavingThrowsEligibility(false);
    let date = new Date();
    //when
    actor.modifyHp(-20, date);
    //then
    expect(actor.isDead()).toEqual(true)
  });

  it("should remove unconsciousness when actor's HP raises above 0", () => {
    //given
    let actor = new Actor('Actor Name', 20, 1);
    let date = new Date();
    actor.modifyHp(-1, date);
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBeTrue();
    //when
    actor.modifyHp(1, date);
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
    let date = new Date();
    actor.setTemporaryHitPoints(5, 3);
    //when
    actor.modifyHp(-4, date);
    //then
    expect(actor.getCurrentHP()).toEqual(20);
    expect(actor.getTemporaryHitPoints().getHitPoints()).toEqual(1);
  });

  it("should deplete actor's temporary Hit Points first and then deplete actor's true Hit Points", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    let date = new Date();
    actor.setTemporaryHitPoints(5, 3);
    //when
    actor.modifyHp(-7, date);
    //then
    expect(actor.getCurrentHP()).toEqual(18);
    expect(actor.getTemporaryHitPoints().getHitPoints()).toEqual(0);
  });

  it("should knock down actor if their HP reaches 0", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    let date = new Date();
    //when
    actor.modifyHp(-20, date);
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
    let date = new Date();
    //when
    actor.modifyHp(-25, date);
    //then
    expect(actor.getCurrentHP()).toEqual(0);
  });

  it("should not allow actor to have HP less than 0", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    let date = new Date();
    //when
    actor.modifyHp(-30, date);
    //then
    expect(actor.getCurrentHP()).toEqual(0);
  });

  it("should remove knocked down state if actor gets healed above 1 HP", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    let date = new Date();
    //when
    actor.modifyHp(-21, date);
    actor.modifyHp(2, date);
    //then
    expect(actor.isKnockedDown()).toBeFalse();
  });

  it("should remove stabilized state if actor is hit", () => {
    //given
    let actor = new Actor('Actor Name', 20);
    let date = new Date();
    actor.modifyHp(-20, date);
    expect(actor.isStabilized()).toBeFalse();
    actor.setStabilized(true);

    //when
    actor.modifyHp(-1, date);

    //then
    expect(actor.isStabilized()).toBeFalse();
  });

  it("should remove knocked down state if actor is healed above 0 HP", () => {
    // given
    let actor = new Actor('Actor 1', 1);
    let date = new Date();
    actor.modifyHp(-1, date);
    expect(actor.isKnockedDown()).toBeTrue();

    // when
    actor.modifyHp(1, date);

    // then
    expect(actor.isKnockedDown()).toBeFalse();
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toBeFalse();
  });

  it("should Revivify", () => {
    // given
    let character = new Actor('Character 1', 1);
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1524, 11, 17, 18, 31, 0)
    character.kill(charactersDeathDate);

    // when
    character.revivify(currentDate);

    // then
    expect(character.isDead()).toBeFalse();
    expect(character.getCurrentHP()).toEqual(1);
    expect(character.getTimeOfDeath()).toBeUndefined();
    expect(character.getResurrectionPenalty()).toEqual(0);
  });

  it("should not Revivify character that has been dead for more than 1 minute", () => {
    // given
    let character = new Actor('Character 1', 1);
    let currentDate = new Date(1524, 11, 17, 18, 32, 1);
    let charactersDeathDate = new Date(1524, 11, 17, 18, 31, 0)
    character.kill(charactersDeathDate);

    // when
    character.revivify(currentDate);

    // then
    expect(character.isDead()).toBeTrue();
  });

  it("should Raise Dead", () => {
    // given
    let character = new Actor('Character 1', 1);
    let magicalConditions = Condition.MAGICAL_CONDITIONS.map(condition => {
      let battleCondition = new BattleCondition(condition);
      character.addCondition(battleCondition);
      return battleCondition;
    })
    Condition.NON_MAGICAL_CONDITIONS.forEach(condition => {
      character.addCondition(new BattleCondition(condition));
    })
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1524, 11, 17, 18, 31, 0);
    character.kill(charactersDeathDate);

    // when
    character.raiseDead(currentDate);

    // then
    expect(character.isDead()).toBeFalse();
    expect(character.getCurrentHP()).toEqual(1);
    expect(character.getConditions()).toEqual(magicalConditions);
    expect(character.getResurrectionPenalty()).toEqual(4);
    expect(character.getTimeOfDeath()).toBeUndefined();
  });

  it("should not Raise Dead character that has been dead up to 10 days", () => {
    // given
    let character = new Actor('Character 1', 1);
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1524, 11, 7, 18, 31, 0);
    character.kill(charactersDeathDate);

    // when
    character.raiseDead(currentDate);

    // then
    expect(character.isDead()).toBeTrue();
  });

  it("should Reincarnate", () => {
    // given
    let character = new Actor('Character 1', 1);
    Condition.ALL_CONDITIONS.forEach(condition => {
      let battleCondition = new BattleCondition(condition);
      character.addCondition(battleCondition);
    })
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1524, 11, 17, 18, 31, 0);
    character.modifyHp(-5, charactersDeathDate);

    // when
    character.reincarnate(currentDate);

    // then
    expect(character.isDead()).toBeFalse();
    expect(character.getCurrentHP()).toEqual(character.getMaxHP());
    expect(character.getConditions().length).toEqual(0);
    expect(character.getResurrectionPenalty()).toEqual(0);
    expect(character.getTimeOfDeath()).toBeUndefined();
  });

  it("should not Reincarnate character that has been dead up to 10 days", () => {
    // given
    let character = new Actor('Character 1', 1);
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1524, 11, 7, 18, 31, 0);
    character.kill(charactersDeathDate);

    // when
    character.reincarnate(currentDate);

    // then
    expect(character.isDead()).toBeTrue();
  });

  it("should use Resurrection", () => {
    // given
    let character = new Actor('Character 1', 1);
    Condition.ALL_CONDITIONS.forEach(condition => {
      let battleCondition = new BattleCondition(condition);
      character.addCondition(battleCondition);
    })
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1424, 11, 17, 18, 32, 0);
    character.modifyHp(-5, charactersDeathDate);

    // when
    character.resurrection(currentDate);

    // then
    expect(character.isDead()).toBeFalse();
    expect(character.getCurrentHP()).toEqual(character.getMaxHP());
    expect(character.getConditions().length).toEqual(3);
    expect(character.getResurrectionPenalty()).toEqual(4);
    expect(character.getTimeOfDeath()).toBeUndefined();
  });

  it("should not succeed with Resurrection", () => {
    // given
    let character = new Actor('Character 1', 1);
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1424, 11, 17, 18, 31, 59);
    character.kill(charactersDeathDate);

    // when
    character.resurrection(currentDate);

    // then
    expect(character.isDead()).toBeTrue();
  });

  it("should use True Resurrection", () => {
    // given
    let character = new Actor('Character 1', 1);
    Condition.ALL_CONDITIONS.forEach(condition => {
      let battleCondition = new BattleCondition(condition);
      character.addCondition(battleCondition);
    })
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1324, 11, 17, 18, 32, 0);
    character.modifyHp(-5, charactersDeathDate);

    // when
    character.trueResurrection(currentDate);

    // then
    expect(character.isDead()).toBeFalse();
    expect(character.getCurrentHP()).toEqual(character.getMaxHP());
    expect(character.getConditions().length).toEqual(0);
    expect(character.getResurrectionPenalty()).toEqual(0);
    expect(character.getTimeOfDeath()).toBeUndefined();
  });

  it("should not succeed with True Resurrection", () => {
    // given
    let character = new Actor('Character 1', 1);
    let currentDate = new Date(1524, 11, 17, 18, 32, 0);
    let charactersDeathDate = new Date(1324, 11, 17, 18, 31, 59);
    character.kill(charactersDeathDate);

    // when
    character.trueResurrection(currentDate);

    // then
    expect(character.isDead()).toBeTrue();
  });

});
