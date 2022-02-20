// class for testing Actor logic
import {Actor} from "./actor";
import {Condition} from "./Condition";
import {BattleCondition} from "./battleCondition";

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

  it('should kill actor when their HP reaches opposite value of their max HP', () => {
    //given
    let actor = new Actor('Actor Name', 20);
    //when
    actor.modifyHp(-40);
    //then
    expect(actor.dead).toEqual(true)
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

});
