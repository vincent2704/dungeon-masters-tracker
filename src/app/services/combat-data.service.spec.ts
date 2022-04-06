import { TestBed } from '@angular/core/testing';

import { CombatDataService } from './combat-data.service';
import {Actor} from "../models/actor";
import {Difficulty} from "../models/combat-data/Difficulty";

describe('CombatDataService', () => {
  let service: CombatDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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
    let easyXpThreshold = service.getActorsDifficultyThreshold(Difficulty.EASY, actors);
    let mediumXpThreshold = service.getActorsDifficultyThreshold(Difficulty.MEDIUM, actors);
    let hardXpThreshold = service.getActorsDifficultyThreshold(Difficulty.HARD, actors);
    let deadlyXpThreshold = service.getActorsDifficultyThreshold(Difficulty.DEADLY, actors);

    //then
    expect(easyXpThreshold).toEqual(1_950);
    expect(mediumXpThreshold).toEqual(3_950);
    expect(hardXpThreshold).toEqual(5_850);
    expect(deadlyXpThreshold).toEqual(8_800);
  });

  it('should return combat multiplier', () => {
    //when
    let firstMultiplier = service.getCombatMultiplier(1);
    let secondMultiplier = service.getCombatMultiplier(2);
    let thirdMultiplier = service.getCombatMultiplier(5);
    let fourthMultiplier = service.getCombatMultiplier(9);
    let fifthMultiplier = service.getCombatMultiplier(14);
    let sixthMultiplier = service.getCombatMultiplier(16);

    //then
    expect(firstMultiplier).toEqual(1);
    expect(secondMultiplier).toEqual(1.5);
    expect(thirdMultiplier).toEqual(2);
    expect(fourthMultiplier).toEqual(2.5);
    expect(fifthMultiplier).toEqual(3);
    expect(sixthMultiplier).toEqual(4);
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
    expect(service.getDifficulty(actors, 1000, 1)).toEqual(Difficulty.EASY);
    expect(service.getDifficulty(actors, 700, 2)).toEqual(Difficulty.EASY);
    expect(service.getDifficulty(actors, 500, 4)).toEqual(Difficulty.EASY);
    expect(service.getDifficulty(actors, 400, 8)).toEqual(Difficulty.EASY);
    expect(service.getDifficulty(actors, 350, 12)).toEqual(Difficulty.EASY);
    expect(service.getDifficulty(actors, 250, 15)).toEqual(Difficulty.EASY);
  });

  it('should return proper difficulty', () => {
    //given
    let numberOfMonsters = 5;

    let actor1 = new Actor('Actor 1', 10);
    let actor2 = new Actor('Actor 2', 10);
    let actor3 = new Actor('Actor 3', 10);
    let actor4 = new Actor('Actor 4', 10);

    actor1.setLevel(5);
    actor2.setLevel(7);
    actor3.setLevel(9);
    actor4.setLevel(11);

    let actors = [actor1, actor2, actor3, actor4];

    let monsterXpEasy = 800;
    let monsterXpMedium = 1000;
    let monsterXpHard = 3000;
    let monsterXpDeadly = 4500;

    //when
    let expectedEasy = service.getDifficulty(actors, monsterXpEasy, numberOfMonsters);
    let expectedMedium = service.getDifficulty(actors, monsterXpMedium, numberOfMonsters);
    let expectedHard = service.getDifficulty(actors, monsterXpHard, numberOfMonsters);
    let expectedDeadly = service.getDifficulty(actors, monsterXpDeadly, numberOfMonsters);

    //then
    expect(expectedEasy).toEqual(Difficulty.EASY);
    expect(expectedMedium).toEqual(Difficulty.MEDIUM);
    expect(expectedHard).toEqual(Difficulty.HARD);
    expect(expectedDeadly).toEqual(Difficulty.DEADLY);
  });

});
