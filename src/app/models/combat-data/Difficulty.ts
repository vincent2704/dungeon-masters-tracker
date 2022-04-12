export class Difficulty {

  private constructor(private description: string) {
  }

  static EASY = new Difficulty("Easy");
  static MEDIUM = new Difficulty("Medium");
  static HARD = new Difficulty("Hard");
  static DEADLY = new Difficulty("Deadly");

  getDescription() {
    return this.description;
  }

}
