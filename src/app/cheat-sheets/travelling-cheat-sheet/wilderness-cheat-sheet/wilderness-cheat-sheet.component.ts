import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-wilderness-cheat-sheet',
  templateUrl: './wilderness-cheat-sheet.component.html',
  styleUrls: ['./wilderness-cheat-sheet.component.css']
})
export class WildernessCheatSheetComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  getExtremeColdTemperature(): string {
    return this.settingsService.isUsingSISystem() ? '-18°C' : '0°F';
  }

  getExtremeHeatTemperature(): string {
    return this.settingsService.isUsingSISystem() ? '38°C' : '100°F';
  }

  getHighAltitudeThreshold(): string {
    return this.settingsService.isUsingSISystem() ? '3000 meters' : '10,000 feet';
  }

  getVeryHighAltitudeThreshold(): string {
    return this.settingsService.isUsingSISystem() ? '6000 meters' : '20,000 feet';
  }

  getHolyWaterPurifyArea(): string {
    return this.settingsService.isUsingSISystem() ? '3-meter-square' : '10-foot-square';
  }

  getQuicksandArea(): string {
    return this.settingsService.isUsingSISystem() ? '3-meter-square' : '10-foot-square';
  }

  getQuicksandDepth(): string {
    return this.settingsService.isUsingSISystem() ? '3 meters' : '10 feet';
  }

  getQuicksandSinkingModifier(): string {
    return this.settingsService.isUsingSISystem() ? '(1d4+1) x 30 centimeters' : '1d4 + 1 feet';
  }

  getQuicksandSinkingConstant(): string {
    return this.settingsService.isUsingSISystem() ? '1d4 x 30 centimeters' : '1d4 feet';
  }

  getQuicksandDifficultyCheck(baseDifficulty: number): string {
    return this.settingsService.isUsingSISystem()
      ? `${baseDifficulty} plus 1 per each 30 centimeters` : `${baseDifficulty} plus the number of feet`;
  }

  getRazorvineDimensions(): string {
    return this.settingsService.isUsingSISystem()
      ? '3-meter-high, 3-meter-wide, 1.5-meter-thick' : '10-foot-high, 10-foot-wide, 5-foot-thick';
  }

  getThinIceWeightTolerance(): string {
    return this.settingsService.isUsingSISystem()
      ? '3d10 x 5 kg per 3-meter-square' : '3d10 x 10 pounds per 10-foot-square';
  }

}
