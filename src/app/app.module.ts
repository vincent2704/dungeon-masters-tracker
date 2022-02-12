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

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    PrepareBattleComponent,
    ConditionComponent,
    AddActorComponent
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
