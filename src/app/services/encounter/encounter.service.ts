import { Injectable } from '@angular/core';
import {Encounter} from "../../models/encounter";
import {Monster} from "../../models/monsters/monster";
import {MonsterList} from "../../models/monsters/monsterList";

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  private encounters: Encounter[] = [];

  constructor() {
    this.encounters = [
      new Encounter(
        'Zasadzka na północ od Walsanii',
        new Map<Monster, number>([
          [MonsterList.ZOMBIE, 2],
          [MonsterList.WEREWOLF, 1],
        ]),
        'To się dzieje w roku 1524 pod koniec lipca jak postanowili wyjść z Walsanii i przyśniły im się dziwne' +
        'rzeczy i przy okazji wilkołaki i zombie uciekły sobie z zoo'
        )
    ]
  }

  getEncounters(): Encounter[] {
    return this.encounters;
  }

  addEncounter(encounter: Encounter): void {
    this.encounters.push(encounter);
  }

}
