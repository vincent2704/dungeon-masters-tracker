import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BattleComponent} from "./battle/battle.component";
import {ToolsComponent} from "./tools/tools.component";
import {CheatSheetsComponent} from "./cheat-sheets/cheat-sheets.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  { path: 'battle', component: BattleComponent },
  { path: 'cheat-sheets', component: CheatSheetsComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
