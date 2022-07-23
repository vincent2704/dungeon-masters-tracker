import {Component, OnInit} from '@angular/core';
import {Settings} from "../../../services/settings/settings";

@Component({
  selector: 'app-wilderness-cheat-sheet',
  templateUrl: './wilderness-cheat-sheet.component.html',
  styleUrls: ['./wilderness-cheat-sheet.component.css']
})
export class WildernessCheatSheetComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  getExtremeColdTemperature(): string {
    return Settings.isUsingSISystem() ? '-18°C' : '0°F';
  }

  getExtremeHeatTemperature(): string {
    return Settings.isUsingSISystem() ? '38°C' : '100°F';
  }

  getHighAltitudeThreshold(): string {
    return Settings.isUsingSISystem() ? '3000 meters' : '10,000 feet';
  }

  getVeryHighAltitudeThreshold(): string {
    return Settings.isUsingSISystem() ? '6000 meters' : '20,000 feet';
  }

  getHolyWaterPurifyArea(): string {
    return Settings.isUsingSISystem() ? '3-meter-square' : '10-foot-square';
  }

  getQuicksandArea(): string {
    return Settings.isUsingSISystem() ? '3-meter-square' : '10-foot-square';
  }

  getQuicksandDepth(): string {
    return Settings.isUsingSISystem() ? '3 meters' : '10 feet';
  }

  getQuicksandSinkingModifier(): string {
    return Settings.isUsingSISystem() ? '(1d4+1) x 30 centimeters' : '1d4 + 1 feet';
  }

  getQuicksandSinkingConstant(): string {
    return Settings.isUsingSISystem() ? '1d4 x 30 centimeters' : '1d4 feet';
  }

  getQuicksandDifficultyCheck(baseDifficulty: number): string {
    return Settings.isUsingSISystem()
      ? `${baseDifficulty} plus 1 per each 30 centimeters` : `${baseDifficulty} plus the number of feet`;
  }

  getRazorvineDimensions(): string {
    return Settings.isUsingSISystem()
      ? '3-meter-high, 3-meter-wide, 1.5-meter-thick' : '10-foot-high, 10-foot-wide, 5-foot-thick';
  }

  getThinIceWeightTolerance(): string {
    return Settings.isUsingSISystem()
      ? '3d10 x 5 kg per 3-meter-square' : '3d10 x 10 pounds per 10-foot-square';
  }

}
