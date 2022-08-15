import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleComponent } from './battle/battle.component';
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrepareBattleComponent } from "./battle/prepare-battle/prepare-battle.component";
import { ConditionComponent } from './battle/condition/condition.component';
import { AddActorComponent } from './battle/add-actor/add-actor.component';
import { DeathSavingThrowsComponent } from './battle/condition/death-saving-throws/death-saving-throws.component';
import { CheatSheetsComponent } from './cheat-sheets/cheat-sheets.component';
import { TravellingCheatSheetComponent } from './cheat-sheets/travelling-cheat-sheet/travelling-cheat-sheet.component';
import { CoverCheatSheetComponent } from './cheat-sheets/cover-cheat-sheet/cover-cheat-sheet.component';
import { AbilityChecksCheatSheetComponent } from './cheat-sheets/ability-checks-cheat-sheet/ability-checks-cheat-sheet.component';
import { PacesAndDistancesCheatSheetComponent } from './cheat-sheets/travelling-cheat-sheet/paces-and-distances-cheat-sheet/paces-and-distances-cheat-sheet.component';
import { WildernessCheatSheetComponent } from './cheat-sheets/travelling-cheat-sheet/wilderness-cheat-sheet/wilderness-cheat-sheet.component';
import { TemporaryHitPointsComponent } from './battle/temporary-hit-points/temporary-hit-points.component';
import { ToolsComponent } from './tools/tools.component';
import { DistanceCalculatorComponent } from "./tools/distance-calculator/distance-calculator.component";
import { TravelCalculatorComponent } from "./tools/travel-calculator/travel-calculator.component";
import { CombatEncounterComponent } from './cheat-sheets/combat-encounter/combat-encounter.component';
import { CombatDifficultyCalculatorComponent } from './tools/combat-difficulty-calculator/combat-difficulty-calculator.component';
import { SettingsComponent } from './settings/settings.component';
import { CampaignOverviewComponent } from './campaign-overview/campaign-overview.component';
import { TimeConfigurationComponent } from './campaign-overview/time-configuration/time-configuration.component';
import { RestingComponent } from './resting/resting.component';
import { ShortRestComponent } from './resting/short-rest/short-rest.component';
import { LongRestComponent } from './resting/long-rest/long-rest.component';
import { CampaignEventsComponent } from './campaign-overview/campaign-events/campaign-events.component';
import { ResurrectionComponent } from './battle/resurrection/resurrection.component';
import { MonstersComponent } from './monsters/monsters.component';
import { MonsterDetailsComponent } from './monsters/monster-details/monster-details.component';
import { TrackerComponent } from './battle/tracker/tracker.component';
import { ManualCalculatorComponent } from './tools/combat-difficulty-calculator/manual-calculator/manual-calculator.component';
import { MonsterListSelectorComponent } from './tools/combat-difficulty-calculator/monster-list-selector/monster-list-selector.component';
import { MonsterBattleListSelectorComponent } from './battle/prepare-battle/monster-selector/monster-battle-list-selector.component';
import { DifficultyBarComponent } from './tools/combat-difficulty-calculator/difficulty-bar/difficulty-bar.component';
import { SavedEncounterComponent } from './battle/prepare-battle/saved-encounter/saved-encounter.component';
import { ProtagonistsManagerComponent } from './campaign-overview/protagonists-manager/protagonists-manager.component';
import { ProtagonistsInfoComponent } from './campaign-overview/protagonists-manager/protagonists-info/protagonists-info.component';
import { ProtagonistsEditorComponent } from './campaign-overview/protagonists-manager/protagonists-editor/protagonists-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    PrepareBattleComponent,
    ConditionComponent,
    AddActorComponent,
    DeathSavingThrowsComponent,
    CheatSheetsComponent,
    TravellingCheatSheetComponent,
    CoverCheatSheetComponent,
    AbilityChecksCheatSheetComponent,
    PacesAndDistancesCheatSheetComponent,
    WildernessCheatSheetComponent,
    TemporaryHitPointsComponent,
    ToolsComponent,
    DistanceCalculatorComponent,
    TravelCalculatorComponent,
    CombatEncounterComponent,
    CombatDifficultyCalculatorComponent,
    SettingsComponent,
    CampaignOverviewComponent,
    TimeConfigurationComponent,
    RestingComponent,
    ShortRestComponent,
    LongRestComponent,
    CampaignEventsComponent,
    ResurrectionComponent,
    MonstersComponent,
    MonsterDetailsComponent,
    TrackerComponent,
    ManualCalculatorComponent,
    MonsterListSelectorComponent,
    MonsterBattleListSelectorComponent,
    DifficultyBarComponent,
    SavedEncounterComponent,
    ProtagonistsManagerComponent,
    ProtagonistsInfoComponent,
    ProtagonistsEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
