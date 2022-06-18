import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BattleComponent} from "./battle/battle.component";
import {ToolsComponent} from "./tools/tools.component";
import {CheatSheetsComponent} from "./cheat-sheets/cheat-sheets.component";
import {SettingsComponent} from "./settings/settings.component";
import {
  AbilityChecksCheatSheetComponent
} from "./cheat-sheets/ability-checks-cheat-sheet/ability-checks-cheat-sheet.component";
import {CombatEncounterComponent} from "./cheat-sheets/combat-encounter/combat-encounter.component";
import {CoverCheatSheetComponent} from "./cheat-sheets/cover-cheat-sheet/cover-cheat-sheet.component";
import {TravellingCheatSheetComponent} from "./cheat-sheets/travelling-cheat-sheet/travelling-cheat-sheet.component";
import {DistanceCalculatorComponent} from "./tools/distance-calculator/distance-calculator.component";
import {TravelCalculatorComponent} from "./tools/travel-calculator/travel-calculator.component";
import {
  CombatDifficultyCalculatorComponent
} from "./tools/combat-difficulty-calculator/combat-difficulty-calculator.component";
import {CampaignOverviewComponent} from "./campaign-overview/campaign-overview.component";
import {
  PacesAndDistancesCheatSheetComponent
} from "./cheat-sheets/travelling-cheat-sheet/paces-and-distances-cheat-sheet/paces-and-distances-cheat-sheet.component";
import {
  WildernessCheatSheetComponent
} from "./cheat-sheets/travelling-cheat-sheet/wilderness-cheat-sheet/wilderness-cheat-sheet.component";
import {RestingComponent} from "./resting/resting.component";

const routes: Routes = [
  { path: '', redirectTo: 'campaign-overview', pathMatch: 'full' },
  { path: 'campaign-overview', component: CampaignOverviewComponent },
  { path: 'battle', component: BattleComponent },
  { path: 'resting', component: RestingComponent },
  {
    path: 'cheat-sheets', component: CheatSheetsComponent,
    children: [
      { path: 'ability-checks', component: AbilityChecksCheatSheetComponent },
      { path: 'combat-encounter', component: CombatEncounterComponent },
      { path: 'cover', component: CoverCheatSheetComponent },
      {
        path: 'traveling', component: TravellingCheatSheetComponent,
        children: [
          { path: 'paces-and-distances', component: PacesAndDistancesCheatSheetComponent },
          { path: 'wilderness', component: WildernessCheatSheetComponent }
        ]
      },
    ]
  },
  {
    path: 'tools', component: ToolsComponent,
    children: [
      { path: '3d-distance-calculator', component: DistanceCalculatorComponent },
      { path: 'travel-calculator', component: TravelCalculatorComponent },
      { path: 'combat-difficulty-calculator', component: CombatDifficultyCalculatorComponent },
    ]
  },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
