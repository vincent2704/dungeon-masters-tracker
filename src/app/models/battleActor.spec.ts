// class for testing BattleActor logic
import {BattleActor} from "./battleActor";
import {Condition} from "./Condition";
import {BattleCondition} from "./battleCondition";

describe('BattleActor', () => {

  it('should add unconscious condition to actor at 0 HP', () => {
    let battleActor = new BattleActor('Vincent Valsani', 100);
    battleActor.addHP(-100);

    expect(battleActor.hasCondition(Condition.UNCONSCIOUS)).toBe(true);
  });

  it("should heal and healing should not exceed actor's max HP", () => {
    let actor = new BattleActor('Actor Name', 20, 18);
    actor.addHP(5);
    expect(actor.getCurrentHP()).toEqual(20)
  });

  it('should kill actor when their HP reaches opposite value of their max HP', () => {
    let actor = new BattleActor('Actor Name', 20);
    actor.addHP(-40);
    expect(actor.dead).toEqual(true)
  });

  it("should remove unconsciousness when actor's HP raises above 0", () => {
    let actor = new BattleActor('Actor Name', 20, 0);
    actor.addCondition(new BattleCondition(Condition.UNCONSCIOUS));

    actor.addHP(1);
    expect(actor.hasCondition(Condition.UNCONSCIOUS)).toEqual(false);
  });

});
