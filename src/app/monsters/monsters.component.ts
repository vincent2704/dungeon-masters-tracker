import {Component, OnInit} from '@angular/core';
import {MonsterService} from "../services/monster/monster.service";
import {Monster} from "../models/monsters/monster";
import {MeasurementSystem} from "../services/measurement-system/measurement.system";
import {MonsterChallenge} from "../models/monsters/monsterChallenge";

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

  getOverview(monster: Monster): string {
    if(monster.getTags().length == 0) {
      return `${monster.getSize().getName()} ${monster.getType()}, ${monster.getAlignment()}`;
    }
    let tags = monster.getTags().join(', ');
    return `${monster.getSize().getName()} ${monster.getType()} (${tags}), ${monster.getAlignment()}`;
  }

  getArmorClass(monster: Monster): string {
    let armor = monster.getArmorClass();
    let armorClass = `${armor.getArmorClassValue()}`
    let equipment = armor.getEquipment();
    if(armor.getEquipment().length > 0) {
      armorClass += ` (${equipment.join(', ')})`;
    }
    return `Armor Class: ${armorClass}`;
  }

  getHitPoints(monster: Monster): string {
    let monsterHitPoints = monster.getHitPoints();
    let diceThrows = monsterHitPoints.getDiceThrows();
    let dieType = monsterHitPoints.getDieType();
    let staticHP = monsterHitPoints.getStaticAdditionalHP();

    let hitPoints = `${monsterHitPoints.getHitPoints()} (${diceThrows}d${dieType}`
    if(staticHP > 0) {
      return `Hit Points: ${hitPoints} + ${staticHP})`;
    }
    return `Hit Points: ${hitPoints})`;
  }

  getSpeed(monster: Monster): string {
    let speed = monster.getSpeed();
    let measurementUnit = MeasurementSystem.getMeasurementUnit();
    let landSpeed = speed.getLandSpeed();
    let flyingSpeed = speed.getFlyingSpeed();
    let swimmingSpeed = speed.getSwimmingSpeed();

    let monsterSpeed = `Speed: ${landSpeed} ${measurementUnit}`;
    if(flyingSpeed > 0) {
      monsterSpeed += `, fly ${flyingSpeed} ${measurementUnit}`;
    }
    if(swimmingSpeed > 0) {
      monsterSpeed += `, swim ${swimmingSpeed} ${measurementUnit}`;
    }

    return monsterSpeed;
  }

  getChallenge(monster: Monster): string {
    return `Challenge: ${MonstersComponent.formatChallengeLevel(monster.getChallenge())} (${monster.getChallenge().getExperiencePoints()}XP)`
  }

  toggleDetails(monster: Monster) {
    let currentShowStatus = this.monsterShowMap.get(monster);
    this.monsterShowMap.set(monster, !currentShowStatus);
  }

  showMonster(monster: Monster): boolean {
    return this.monsterShowMap.get(monster)!;
  }

  private static formatChallengeLevel(challenge: MonsterChallenge): string {
    let challengeLevel = challenge.getChallengeLevel();
    switch (challengeLevel) {
      case 1/8: {
        return '1/8';
      }
      case 1/4: {
        return  '1/4';
      }
      case 1/2: {
        return  '1/2';
      }
      default: {
        return `${challengeLevel}`;
      }
    }
  }

}
