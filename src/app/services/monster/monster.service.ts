import { Injectable } from '@angular/core';
import {Monster} from "../../models/monsters/monster";
import {MonsterManualMonsters} from "../../models/monsters/monsterManualMonsters";

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor() { }

  getMonsters(): Monster[] {
    return MonsterManualMonsters.MONSTERS;
  }
}
