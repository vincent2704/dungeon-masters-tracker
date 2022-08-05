import {Component, OnInit} from '@angular/core';
import {MonsterService} from "../services/monster/monster.service";
import {Monster} from "../models/monsters/monster";
import {MeasurementSystem} from "../services/measurement-system/measurement.system";
import {MonsterSpeedDetails} from "../models/monsters/monster-speed/monsterSpeedDetails";

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {

  monsters: Monster[] = [];
  monsterDetailsShowMap: Map<Monster, boolean> = new Map<Monster, boolean>();
  monsterNamePart: string = '';

  constructor(private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    this.monsters = this.monsterService.getMonsters();
    this.monsters.forEach(monster => {
      this.monsterDetailsShowMap.set(monster, false);
    })
  }

  getOverview(monster: Monster): string {
    if (monster.getTags().length == 0) {
      return `${monster.getSize().getName()} ${monster.getType()}, ${monster.getAlignment()}`;
    }
    let tags = monster.getTags().join(', ');
    return `${monster.getSize().getName()} ${monster.getType()} (${tags}), ${monster.getAlignment()}`;
  }

  getArmorClass(monster: Monster): string {
    let armorClassInfo = 'Armor Class: '
    let monsterArmorClass = monster.getArmorClass();
    for (let armor of monsterArmorClass) {
      let armorClass = `${armor.getArmorClassValue()}`;
      let equipment = armor.getEquipment();
      let equipmentDescription = armor.getDescription();
      if (armor.getEquipment().length > 0) {
        armorClass += ` (${equipment.join(', ')})`;
      }
      if (equipmentDescription) {
        armorClass += ` ${equipmentDescription}`
      }
      if (monsterArmorClass.length > 1 && monsterArmorClass.indexOf(armor) < monsterArmorClass.length - 1) {
        armorClass += ', ';
      }
      armorClassInfo += armorClass;
    }
    return armorClassInfo;
  }

  getHitPoints(monster: Monster): string {
    let monsterHitPoints = monster.getHitPoints();
    let diceThrows = monsterHitPoints.getDiceThrows();
    let dieType = monsterHitPoints.getDieType();
    let staticHP = monsterHitPoints.getStaticAdditionalHP();

    let hitPoints = `${monsterHitPoints.getHitPoints()} (${diceThrows}${dieType.getName()}`
    if (staticHP > 0) {
      return `Hit Points: ${hitPoints} + ${staticHP})`;
    }
    return `Hit Points: ${hitPoints})`;
  }

  getSpeed(monster: Monster): string {
    let monsterSpeed = monster.getSpeed();
    let measurementUnit = MeasurementSystem.getMeasurementUnit();
    let landSpeed = monsterSpeed.getLandSpeed();
    let flyingSpeed = monsterSpeed.getFlyingSpeed();
    let swimmingSpeed = monsterSpeed.getSwimmingSpeed();

    let speed = `Speed: ${landSpeed.getSpeed()} ${measurementUnit}${this.buildDetailsDescription(landSpeed.getDetails())}`;

    let flyingSpeedValue = flyingSpeed.getSpeed();
    if (flyingSpeedValue > 0) {
      speed += `, fly ${flyingSpeedValue} ${measurementUnit}${this.buildDetailsDescription(flyingSpeed.getDetails())}`;
    }

    let swimmingSpeedValue = swimmingSpeed.getSpeed();
    if(swimmingSpeedValue > 0) {
      speed += `, swim ${swimmingSpeedValue} ${measurementUnit}${this.buildDetailsDescription(swimmingSpeed.getDetails())}`;
    }
    return speed;
  }

  getChallenge(monster: Monster): string {
    return `Challenge: ${monster.getChallenge().getChallengeFormatted()}`
  }

  toggleDetails(monster: Monster) {
    let currentShowStatus = this.monsterDetailsShowMap.get(monster);
    this.monsterDetailsShowMap.set(monster, !currentShowStatus);
  }

  showMonsterDetails(monster: Monster): boolean {
    return this.monsterDetailsShowMap.get(monster)!;
  }

  getMonstersFiltered(): Monster[] {
    return this.monsters.filter(monster => {
      return monster.getName().toUpperCase().includes(this.monsterNamePart.toUpperCase());
    })
  }

  private buildDetailsDescription(monsterSpeedDetails: MonsterSpeedDetails): string {
    if (monsterSpeedDetails) {
      let descriptionDistance = monsterSpeedDetails.getDistance();
      if(descriptionDistance) {
        return ` (${descriptionDistance} ${MeasurementSystem.getMeasurementUnit()} ${monsterSpeedDetails.getNote()})`
      } else {
        return ` (${monsterSpeedDetails.getNote()})`;
      }
    }
    return '';
  }

}
