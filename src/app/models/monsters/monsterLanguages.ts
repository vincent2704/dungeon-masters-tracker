import {Language} from "../common/language";

export class MonsterLanguages {

  constructor(private readonly languages: Language[], private readonly telepathyRadius?: string) {
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  getTelepathyRadius() {
    return this.telepathyRadius;
  }

}
