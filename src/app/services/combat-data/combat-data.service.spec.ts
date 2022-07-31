import {CombatDataService} from './combat-data.service';
import {Actor} from "../../models/actor";
import {Difficulty} from "../../models/combat-data/Difficulty";

describe('CombatDataService', () => {

  it('should calculate XP for combat', () => {
    //given
    let actor1 = new Actor('Actor 1', 10);
    let actor2 = new Actor('Actor 2', 10);
    let actor3 = new Actor('Actor 3', 10);
    let actor4 = new Actor('Actor 4', 10);

    actor1.setLevel(5);
    actor2.setLevel(7);
    actor3.setLevel(9);
    actor4.setLevel(11);

    let actors = [actor1, actor2, actor3, actor4];

    //when
    let easyXpThreshold = CombatDataService.getActorsDifficultyThreshold(Difficulty.EASY, actors);
    let mediumXpThreshold = CombatDataService.getActorsDifficultyThreshold(Difficulty.MEDIUM, actors);
    let hardXpThreshold = CombatDataService.getActorsDifficultyThreshold(Difficulty.HARD, actors);
    let deadlyXpThreshold = CombatDataService.getActorsDifficultyThreshold(Difficulty.DEADLY, actors);

    //then
    expect(easyXpThreshold).toEqual(1_950);
    expect(mediumXpThreshold).toEqual(3_950);
    expect(hardXpThreshold).toEqual(5_850);
    expect(deadlyXpThreshold).toEqual(8_800);
  });

  it('should return standard combat multiplier', () => {
    //when
    let firstMultiplier = CombatDataService.getCombatMultiplierValue(4, 1);
    let secondMultiplier = CombatDataService.getCombatMultiplierValue(4, 2);
    let thirdMultiplier = CombatDataService.getCombatMultiplierValue(4, 5);
    let fourthMultiplier = CombatDataService.getCombatMultiplierValue(4, 9);
    let fifthMultiplier = CombatDataService.getCombatMultiplierValue(4, 14);
    let sixthMultiplier = CombatDataService.getCombatMultiplierValue(4, 16);

    //then
    expect(firstMultiplier).toEqual(1);
    expect(secondMultiplier).toEqual(1.5);
    expect(thirdMultiplier).toEqual(2);
    expect(fourthMultiplier).toEqual(2.5);
    expect(fifthMultiplier).toEqual(3);
    expect(sixthMultiplier).toEqual(4);
  });

  it('should return proper multiplier for party smaller than 3', () => {
    //when
    let firstMultiplier = CombatDataService.getCombatMultiplierValue(2, 1);
    let secondMultiplier = CombatDataService.getCombatMultiplierValue(2, 2);
    let thirdMultiplier = CombatDataService.getCombatMultiplierValue(2, 5);
    let fourthMultiplier = CombatDataService.getCombatMultiplierValue(2, 9);
    let fifthMultiplier = CombatDataService.getCombatMultiplierValue(2, 14);
    let sixthMultiplier = CombatDataService.getCombatMultiplierValue(2, 16);

    //then
    expect(firstMultiplier).toEqual(1.5);
    expect(secondMultiplier).toEqual(2);
    expect(thirdMultiplier).toEqual(2.5);
    expect(fourthMultiplier).toEqual(3);
    expect(fifthMultiplier).toEqual(4);
    expect(sixthMultiplier).toEqual(5);
  });

  it('should return proper multiplier for party bigger than 5', () => {
    //when
    let firstMultiplier = CombatDataService.getCombatMultiplierValue(6, 1);
    let secondMultiplier = CombatDataService.getCombatMultiplierValue(6, 2);
    let thirdMultiplier = CombatDataService.getCombatMultiplierValue(6, 5);
    let fourthMultiplier = CombatDataService.getCombatMultiplierValue(6, 9);
    let fifthMultiplier = CombatDataService.getCombatMultiplierValue(6, 14);
    let sixthMultiplier = CombatDataService.getCombatMultiplierValue(6, 16);

    //then
    expect(firstMultiplier).toEqual(.5);
    expect(secondMultiplier).toEqual(1);
    expect(thirdMultiplier).toEqual(1.5);
    expect(fourthMultiplier).toEqual(2);
    expect(fifthMultiplier).toEqual(2.5);
    expect(sixthMultiplier).toEqual(3);
  });

  it('should return easy difficulty for various monster XP and count', () => {
    //given
    let actor1 = new Actor('Actor 1', 10);
    let actor2 = new Actor('Actor 2', 10);
    let actor3 = new Actor('Actor 3', 10);

    // easy threshold - 1150
    actor1.setLevel(5);
    actor2.setLevel(7);
    actor3.setLevel(9);

    let actors = [actor1, actor2, actor3];

    // expect
    expect(CombatDataService.getDifficulty(actors, 1000, 1)).toEqual(Difficulty.EASY);
    expect(CombatDataService.getDifficulty(actors, 700, 2)).toEqual(Difficulty.EASY);
    expect(CombatDataService.getDifficulty(actors, 500, 4)).toEqual(Difficulty.EASY);
    expect(CombatDataService.getDifficulty(actors, 400, 8)).toEqual(Difficulty.EASY);
    expect(CombatDataService.getDifficulty(actors, 350, 12)).toEqual(Difficulty.EASY);
    expect(CombatDataService.getDifficulty(actors, 250, 15)).toEqual(Difficulty.EASY);
  });

  it('should return proper difficulty', () => {
    //given
    let numberOfMonsters = 5;

    let actor1 = new Actor('Actor 1', 10);
    let actor2 = new Actor('Actor 2', 10);
    let actor3 = new Actor('Actor 3', 10);
    let actor4 = new Actor('Actor 4', 10);

    actor1.setLevel(3);
    actor2.setLevel(3);
    actor3.setLevel(3);
    actor4.setLevel(2);

    let actors = [actor1, actor2, actor3, actor4];

    let monsterXpEasy = 250; // threshold - 275, monster XP for 5 monsters - 500
    let monsterXpMedium = 300; // 550, monster XP - 600
    let monsterXpHard = 415; // 825, monster XP - 830
    let monsterXpDeadly = 700; // 1400, monster XP - 1400

    //when
    let expectedEasy = CombatDataService.getDifficulty(actors, monsterXpEasy, numberOfMonsters);
    let expectedMedium = CombatDataService.getDifficulty(actors, monsterXpMedium, numberOfMonsters);
    let expectedHard = CombatDataService.getDifficulty(actors, monsterXpHard, numberOfMonsters);
    let expectedDeadly = CombatDataService.getDifficulty(actors, monsterXpDeadly, numberOfMonsters);

    //then
    expect(expectedEasy).toEqual(Difficulty.EASY);
    expect(expectedMedium).toEqual(Difficulty.MEDIUM);
    expect(expectedHard).toEqual(Difficulty.HARD);
    expect(expectedDeadly).toEqual(Difficulty.DEADLY);
  });

});
