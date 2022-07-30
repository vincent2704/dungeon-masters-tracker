import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {MonsterService} from "../../../services/monster/monster.service";
import {Monster} from "../../../models/monsters/monster";

@Component({
  selector: 'app-monster-list-selector',
  templateUrl: './monster-list-selector.component.html',
  styleUrls: ['./monster-list-selector.component.css']
})
export class MonsterListSelectorComponent implements OnInit {

  @Input()
  selectedActors!: Map<Actor, boolean>;
  monsterService: MonsterService;

  constructor(monsterService: MonsterService) {
    this.monsterService = monsterService;
  }

  ngOnInit(): void {
  }

  getChallenge(monster: Monster): string {
    return monster.getChallenge().getChallengeFormatted();
  }

}
