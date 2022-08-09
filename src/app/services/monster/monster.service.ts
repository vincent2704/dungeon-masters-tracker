import { Injectable } from '@angular/core';
import {Monster} from "../../models/monsters/monster";
import {MonsterList} from "../../models/monsters/monsterList";

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor() { }

  getMonsters(): Monster[] {
    return MonsterList.MONSTERS;
  }
}
