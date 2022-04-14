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

const routes: Routes = [
  { path: 'battle', component: BattleComponent },
  {
    path: 'cheat-sheets', component: CheatSheetsComponent,
    children: [
      { path: 'ability-checks', component: AbilityChecksCheatSheetComponent },
      { path: 'combat-encounter', component: CombatEncounterComponent },
      { path: 'cover', component: CoverCheatSheetComponent },
      { path: 'traveling', component: TravellingCheatSheetComponent },
    ]
  },
  { path: 'tools', component: ToolsComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
