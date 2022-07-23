import {Component, OnInit} from '@angular/core';
import {MonsterService} from "../services/monster/monster.service";
import {Monster} from "../models/monsters/monster";

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {

  monsters: Monster[] = [];
  monsterShowMap: Map<Monster, boolean> = new Map<Monster, boolean>();

  constructor(private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    this.monsters = this.monsterService.getMonsters();
    this.monsters.forEach(monster => {
      this.monsterShowMap.set(monster, false);
    })
  }

  showMonster(monster: Monster): boolean {
    return this.monsterShowMap.get(monster)!;
  }

  toggleDetails(monster: Monster) {
    let currentShowStatus = this.monsterShowMap.get(monster);
    this.monsterShowMap.set(monster, !currentShowStatus);
  }
}
