import {MonsterEquipment} from "./enums/monsterEquipment";
import {MonsterArmorDescription} from "./enums/monsterArmorDescription";

export class MonsterArmor {
  constructor(private readonly armorClass: number, private readonly equipment: MonsterEquipment[] = [],
              private readonly description?: MonsterArmorDescription) {
  }

  getArmorClassValue(): number {
    return this.armorClass;
  }

  getEquipment(): MonsterEquipment[] {
    return this.equipment;
  }

  getDescription(): MonsterArmorDescription {
    return this.description!;
  }

}
