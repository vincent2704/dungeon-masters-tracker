import {Language} from "../../common/language";
import {MonsterLanguageNote} from "./monsterLanguageNote";

export class SingleMonsterLanguage {
  constructor(private readonly language: Language,
              private readonly monsterLanguageNote?: MonsterLanguageNote) {
  }

  getLanguage(): Language {
    return this.language;
  }

  getNote(): MonsterLanguageNote {
    return this.monsterLanguageNote!;
  }

}
