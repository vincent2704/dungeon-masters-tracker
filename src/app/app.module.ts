import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleComponent } from './battle/battle.component';
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PrepareBattleComponent} from "./battle/prepare-battle/prepare-battle.component";
import { ConditionComponent } from './battle/condition/condition.component';
import { AddActorComponent } from './battle/add-actor/add-actor.component';
import { DeathSavingThrowsComponent } from './battle/condition/death-saving-throws/death-saving-throws.component';
import { CheatSheetsComponent } from './cheat-sheets/cheat-sheets.component';
import { TravellingCheatSheetComponent } from './cheat-sheets/travelling-cheat-sheet/travelling-cheat-sheet.component';
import { CoverCheatSheetComponent } from './cheat-sheets/cover-cheat-sheet/cover-cheat-sheet.component';
import { AbilityChecksCheatSheetComponent } from './cheat-sheets/ability-checks-cheat-sheet/ability-checks-cheat-sheet.component';
import { PacesAndDistancesCheatSheetComponent } from './cheat-sheets/travelling-cheat-sheet/paces-and-distances-cheat-sheet/paces-and-distances-cheat-sheet.component';
import { WildernessCheatSheetComponent } from './cheat-sheets/travelling-cheat-sheet/wilderness-cheat-sheet/wilderness-cheat-sheet.component';

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
    WildernessCheatSheetComponent
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
