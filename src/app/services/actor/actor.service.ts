import {Injectable} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";
import {PROTAGONISTS} from "../../models/dummy-backend-data/actorsData";
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Environment} from "../../environment";
import {environment} from "../../../environments/environment";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly playerCharactersUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters`
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", Environment.CAMPAIGN_ID)
  }

  constructor(private httpClient: HttpClient) {
  }

  // temporary method for partial backend implementation, it's going to fully replace `getActors()`
  getPlayerCharacters2(): Observable<PlayerCharacter[]> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(PROTAGONISTS);
    }
    return this.httpClient.get<PlayerCharacter[]>(this.playerCharactersUrl, this.httpOptions)
  }

  fromJson(data: any): Actor {
    let actor = new Actor(data.name, data.maxHp);

    actor.id = data.id;
    actor.currentHp = data.currentHp;
    actor.level = data.level;
    actor.setTimeOfDeath(data.timeOfDeath);
    actor.setResurrectionPenalty(data.resurrectionPenalty);

    return actor;
  }

  updatePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<PlayerCharacter[]> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(PROTAGONISTS);
    }
    return this.httpClient.post<PlayerCharacter[]>(this.playerCharactersUrl, playerCharacters, this.httpOptions);
  }

  deletePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<unknown> {
    if(environment.environmentName == Environment.GHPAGES) {
      return new Observable<unknown>();
    }
    let charactersToDeleteIds = playerCharacters.map(character => character.id);
    let options = {
      params: this.httpOptions.params,
      body: charactersToDeleteIds
    }
    return this.httpClient.delete<Actor[]>(this.playerCharactersUrl, options);
  }

  addBattleCondition(actor: Actor, condition: BattleCondition): void {
    actor.battleConditions.push(condition);
  }

  removeCondition(actor: Actor, conditionToRemove: Condition): void {
    if (actor.battleConditions.find(battleCondition => battleCondition.getCondition() === conditionToRemove)) {
      actor.removeCondition(conditionToRemove);
    }
  }

}
