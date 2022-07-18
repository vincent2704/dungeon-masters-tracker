import { Component, OnInit } from '@angular/core';
import {MonsterService} from "../services/monster/monster.service";
import {Monster} from "../models/monsters/monster";

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {

  monsters: Monster[] = []

  constructor(private monsterService: MonsterService) { }

  ngOnInit(): void {
    this.monsters = this.monsterService.getMonsters();
  }

}
