export class MonsterSize {

  private constructor(private size: string, private space: string) {
  }

  public getSize(): string {
    return $localize`${this.size}`;
  }

  public getSpace(): string {
    return $localize`${this.space}`;
  }

  static TINY = new MonsterSize('Tiny', '2.5 by 2.5 ft.');
  static SMALL = new MonsterSize('Small', '5 by 5 ft.');
  static MEDIUM = new MonsterSize('Medium', '5 by 5 ft.');
  static LARGE = new MonsterSize('Large', '10 by 10 ft.');
  static HUGE = new MonsterSize('Huge', '15 by 15 ft.');
  static MONSTROSITY = new MonsterSize('Monstrosity', '20 by 20 ft. or larger');

}
