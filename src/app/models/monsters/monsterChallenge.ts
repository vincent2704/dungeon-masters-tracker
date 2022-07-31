// source: Monster Manual, page 9
export class MonsterChallenge {

  private constructor(private challengeLevel: number, private experiencePoints: number) {
  }

  static ZERO = new MonsterChallenge(0, 10);
  static ONE_EIGHTH = new MonsterChallenge(1/8, 25);
  static ONE_FOURTH = new MonsterChallenge(1/4, 50);
  static HALF = new MonsterChallenge(1/2, 100);

  static ONE = new MonsterChallenge(1, 200);
  static TWO = new MonsterChallenge(2, 450);
  static THREE = new MonsterChallenge(3, 700);
  static FOUR = new MonsterChallenge(4, 1100);
  static FIVE = new MonsterChallenge(5, 1800);

  static SIX = new MonsterChallenge(6, 2300);
  static SEVEN = new MonsterChallenge(7, 2900);
  static EIGHT = new MonsterChallenge(8, 3900);
  static NINE = new MonsterChallenge(9, 5000);
  static TEN = new MonsterChallenge(10, 5900);

  static ELEVEN = new MonsterChallenge(11, 7200);
  static TWELVE = new MonsterChallenge(12, 8400);
  static THIRTEEN = new MonsterChallenge(13, 10_000);
  static FOURTEEN = new MonsterChallenge(14, 11_500);
  static FIFTEEN = new MonsterChallenge(15, 13_000);

  static SIXTEEN = new MonsterChallenge(16, 15_000);
  static SEVENTEEN = new MonsterChallenge(17, 18_000);
  static EIGHTEEN = new MonsterChallenge(18, 20_000);
  static NINETEEN = new MonsterChallenge(19, 22_000);
  static TWENTY = new MonsterChallenge(20, 25_000);

  static TWENTY_ONE = new MonsterChallenge(21, 33_000);
  static TWENTY_TWO = new MonsterChallenge(22, 41_000);
  static TWENTY_THREE = new MonsterChallenge(23, 50_000);
  static TWENTY_FOUR = new MonsterChallenge(24, 62_000);
  static TWENTY_FIVE = new MonsterChallenge(25, 75_000);

  static TWENTY_SIX = new MonsterChallenge(26, 90_000);
  static TWENTY_SEVEN = new MonsterChallenge(27, 105_000);
  static TWENTY_EIGHT = new MonsterChallenge(28, 120_000);
  static TWENTY_NINE = new MonsterChallenge(29, 135_000);
  static THIRTY = new MonsterChallenge(40, 155_000);

  getChallengeFormatted(): string {
    return `${this.getChallengeLevelFormatted()} (${this.getExperiencePoints()} XP)`
  }

  getChallengeLevel(): number {
    return this.challengeLevel;
  }

  getExperiencePoints(): number {
    return this.experiencePoints;
  }

  private getChallengeLevelFormatted(): string {
    switch (this.challengeLevel) {
      case 1/8: {
        return '1/8';
      }
      case 1/4: {
        return  '1/4';
      }
      case 1/2: {
        return  '1/2';
      }
      default: {
        return `${this.challengeLevel}`;
      }
    }
  }

}
