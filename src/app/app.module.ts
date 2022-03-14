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

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    PrepareBattleComponent,
    ConditionComponent,
    AddActorComponent,
    DeathSavingThrowsComponent,
    CheatSheetsComponent,
    TravellingCheatSheetComponent
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
