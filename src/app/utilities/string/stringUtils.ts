import {MeasurementSystem} from "../../services/measurement-system/measurement.system";

export class StringUtils {

  static formatDescription(description: string): string {
    description = description.replaceAll("{ft.}", MeasurementSystem.getMeasurementUnit())
    description = description.replaceAll("{feet}", MeasurementSystem.getMeasurementUnitLong())

    let speedValues = description.match(/{[\w\d]+}/g);
    if (speedValues) {
      speedValues.map(value => {
        return value.substring(1, value.length - 1);
      }).forEach(speedValue => {
        description = description.replace(`{${speedValue}}`,
          MeasurementSystem.getFeetDistance(parseInt(speedValue)).toString());
      })
    }
    return description;
  }

}
