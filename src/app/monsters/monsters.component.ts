import {Component, OnInit} from '@angular/core';
import {MonsterService} from "../services/monster/monster.service";
import {Monster} from "../models/monsters/monster";
import {MeasurementSystem} from "../services/measurement-system/measurement.system";

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

  getHitPoints(monster: Monster): string {
    let monsterHitPoints = monster.getHitPoints();
    let diceThrows = monsterHitPoints.getDiceThrows();
    let dieType = monsterHitPoints.getDieType();
    let staticHP = monsterHitPoints.getStaticAdditionalHP();

    let hitPoints = `${monsterHitPoints.getHitPoints()} (${diceThrows}d${dieType}`
    if(staticHP > 0) {
      return `${hitPoints} + ${staticHP})`;
    }
    return `${hitPoints})`;
  }

  getSpeed(monster: Monster): string {
    let speed = monster.getSpeed();
    let measurementUnit = MeasurementSystem.getMeasurementUnit();
    let landSpeed = speed.getLandSpeed();
    let flyingSpeed = speed.getFlyingSpeed();
    let swimmingSpeed = speed.getSwimmingSpeed();


    let monsterSpeed = `${landSpeed} ${measurementUnit}`;
    if(flyingSpeed > 0) {
      monsterSpeed += `, fly ${flyingSpeed} ${measurementUnit}`;
    }
    if(swimmingSpeed > 0) {
      monsterSpeed += `, swim ${swimmingSpeed} ${measurementUnit}`;
    }

    return monsterSpeed;
  }
}
