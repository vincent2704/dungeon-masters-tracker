import {MeasurementSystem} from "../../services/measurement-system/measurement.system";
import {DiceRoll} from "../../models/common/diceRoll";

export class StringUtils {

  static formatActionDescription(description: string, attackModifier: number, damageRoll: DiceRoll | undefined): string {
    if (attackModifier > 0) {
      description = `+${attackModifier} ` + description
    }
    if (damageRoll) {
      description = this.formatDamageInfo(description, damageRoll);
    }
    description = this.formatDescription(description);

    return description;
  }

  static formatDamageInfo(description: string, damageRoll: DiceRoll): string {
    let damageRollString: string = `${damageRoll.getHitPoints()} ` +
      `(${damageRoll.getDiceThrows()}${damageRoll.getDieType().getName()}`
    const staticAdditionalHp = damageRoll.getStaticAdditionalHP();
    if (staticAdditionalHp == 0) {
      damageRollString += `)`;
    } else {
      damageRollString += ` + ${staticAdditionalHp})`;
    }
    return description.replace("{damageInfo}", damageRollString)
  }

  static formatDescription(description: string) {
    description = this.formatMiles(description);
    description = this.formatFeet(description);

    return description;
  }

  // due to its frequency, formatter treats all numeric content between '{' and '}' as feet values
  // this is why this regex is finding '{miles}' or '{mile}' after the value first, not to confuse it with
  // different calculation algorithm
  private static formatMiles(description: string): string {
    let mileDistances = description.match(/{[\w\d]+} ({miles}|{mile})/g)
    if (mileDistances) {
      mileDistances.map(mileDistance => {
        description = description.replace("{miles}", MeasurementSystem.getMilesMeasurementUnitLong())
        description = description.replace("{mile}", MeasurementSystem.getMilesMeasurementUnitLongSingular())
        return mileDistance.substring(mileDistance.indexOf("{") + 1, mileDistance.indexOf("}"))
      }).forEach(mileDistanceValue => {
        description = description.replace(`{${mileDistanceValue}}`,
          MeasurementSystem.getMilesDistance(parseInt(mileDistanceValue)).toString())
      })
    }
    return description;
  }

  // after miles are converted, all other numbers left between '{' and '}' are treated as feet unit and
  // converted this way, with no additional checks of what sort of unit appears after the numeric value
  private static formatFeet(description: string): string {
    description = description.replaceAll("{ft.}", MeasurementSystem.getMeasurementUnit())
    description = description.replaceAll("{feet}", MeasurementSystem.getMeasurementUnitLong())
    description = description.replaceAll("{foot}", MeasurementSystem.getMeasurementUnitLongSingular())

    let footDistances = description.match(/{[\w\d]+}/g);
    if (footDistances) {
      footDistances.map(value => {
        return value.substring(1, value.length - 1);
      }).forEach(speedValue => {
        description = description.replace(`{${speedValue}}`,
          MeasurementSystem.getFeetDistance(parseInt(speedValue)).toString());
      })
    }
    return description;
  }

}
