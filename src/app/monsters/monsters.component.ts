import {Component, OnInit} from '@angular/core';
import {MonsterService} from "../services/monster/monster.service";
import {Monster} from "../models/monsters/monster";
import {MeasurementSystem} from "../services/measurement-system/measurement.system";
import {MonsterSpeedDetails} from "../models/monsters/monster-speed/monsterSpeedDetails";
import {MovementType} from "../models/monsters/monster-speed/movementType";
import { MonsterChallenge } from "../models/monsters/monsterChallenge";

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {

  monsters: Monster[] = [];
  monsterDetailsShowMap: Map<Monster, boolean> = new Map<Monster, boolean>();
  monsterNameActiveFilterString: string = '';

  isCollapsed: boolean = true;

  challengeLevels: MonsterChallenge[] = [];
  enabledChallengeLevelFilters: Map<MonsterChallenge, boolean> = new Map<MonsterChallenge, boolean>();

  enableAllChallengeLevels: boolean = true;
  disableAllChallengeLevels: boolean = false;

  constructor(private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    this.monsters = this.monsterService.getMonsters();
    this.monsters.forEach(monster => {
      this.monsterDetailsShowMap.set(monster, false);
    })
    this.challengeLevels = MonsterChallenge.getChallengeLevelsList();
    MonsterChallenge.getChallengeLevelsList()
      .forEach(challengeLevel => {
        this.enabledChallengeLevelFilters.set(challengeLevel, true);
    })
  }

  getOverview(monster: Monster): string {
    let basicInfo = monster.getBasicInfo();
    let details = monster.getDetails();

    if (details.getTags().length == 0) {
      return `${basicInfo.getSize().getName()} ${basicInfo.getType()}, ${details.getAlignment()}`;
    }
    let tags = details.getTags().join(', ');
    return `${basicInfo.getSize().getName()} ${basicInfo.getType()} (${tags}), ${details.getAlignment()}`;
  }

  getArmorClass(monster: Monster): string {
    let armorClassInfo = 'Armor Class: '
    let monsterArmorClass = monster.getDetails().getArmorClass();
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
    let monsterHitPoints = monster.getDetails().getHitPoints();
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
    let monsterSpeeds = monster.getDetails().getSpeeds();
    let measurementUnit = MeasurementSystem.getMeasurementUnit();

    let speeds = "Speed:"

    for (let monsterSpeed of monsterSpeeds) {
      let movementType = monsterSpeed.getMovementType();
      let speedInformation =
        `${movementType} ${monsterSpeed.getSpeed()} ${measurementUnit}${this.buildDetailsDescription(monsterSpeed.getDetails())}`;
      if (movementType === MovementType.LAND) {
        speeds += speedInformation
      } else {
        speeds += `, ${speedInformation}`
      }
    }
    return speeds;
  }

  getChallenge(monster: Monster): string {
    return `Challenge: ${monster.getBasicInfo().getChallengeRating().getChallengeFormatted()}`
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
      return this.monsterNameContainsFilterString(monster) && this.monsterMatchesChallengeFilter(monster)
    })
  }

  enableAllChallengeLevelsFilter() {
    this.enableAllChallengeLevels = !this.enableAllChallengeLevels;
    if(!this.enableAllChallengeLevels){
      this.enableAllChallengeLevels = true;
      this.disableAllChallengeLevels = false;
      this.enabledChallengeLevelFilters.forEach((value, challengeLevel) => {
        this.enabledChallengeLevelFilters.set(challengeLevel, true);
      })
    }
  }

  disableAllChallengeLevelsFilter() {
    this.disableAllChallengeLevels = !this.disableAllChallengeLevels;
    if(!this.disableAllChallengeLevels) {
      this.enableAllChallengeLevels = false;
      this.disableAllChallengeLevels = true;
      this.enabledChallengeLevelFilters.forEach((value, challengeLevel) => {
        this.enabledChallengeLevelFilters.set(challengeLevel, false);
      })
    }
  }

  changeChallengeFilterValue(key: MonsterChallenge) {
    let currentValue = this.enabledChallengeLevelFilters.get(key);
    this.enabledChallengeLevelFilters.set(key, !currentValue);
    this.enableAllChallengeLevels = false;
    this.disableAllChallengeLevels = false;
  }

  private monsterNameContainsFilterString(monster: Monster): boolean {
    return monster.getBasicInfo().getName().toUpperCase().includes(this.monsterNameActiveFilterString.toUpperCase());
  }

  private monsterMatchesChallengeFilter(monster: Monster): boolean {
    let activeChallengeFilters: MonsterChallenge[] = [];
    this.enabledChallengeLevelFilters.forEach(
      (enabled, monsterChallenge) => {
        if(enabled) {
          activeChallengeFilters.push(monsterChallenge);
        }
      })
    return !!activeChallengeFilters.find(monsterChallenge => {
      return monsterChallenge == monster.getBasicInfo().getChallengeRating()
    })
  }

  private buildDetailsDescription(monsterSpeedDetails: MonsterSpeedDetails): string {
    if (monsterSpeedDetails) {
      let descriptionDistance = monsterSpeedDetails.getDistance();
      if (descriptionDistance) {
        return ` (${descriptionDistance} ${MeasurementSystem.getMeasurementUnit()} ${monsterSpeedDetails.getNote()})`
      } else {
        return ` (${monsterSpeedDetails.getNote()})`;
      }
    }
    return '';
  }

}
