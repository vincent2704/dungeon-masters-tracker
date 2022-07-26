import {MonsterEquipment} from "./enums/monsterEquipment";

export class MonsterArmor {
  constructor(private readonly armorClass: number, private readonly equipment: MonsterEquipment[] = []) {
  }

  getArmorClassValue(): number {
    return this.armorClass;
  }

  getEquipment(): MonsterEquipment[] {
    return this.equipment;
  }

}
