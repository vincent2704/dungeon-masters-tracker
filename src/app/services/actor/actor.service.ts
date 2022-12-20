import {Injectable} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Environment} from "../../environment";
import {environment} from "../../../environments/environment";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {PlayerBattleFinishedRequest} from "../../models/actors/playerBattleFinishedRequest";
import {BattleParticipantType} from "../../models/actors/battleParticipantType";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private demoPlayers: PlayerCharacter[] = [];

  private readonly playerCharactersUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters`
  private readonly battleFinishedUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters/finish-battle`
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", Environment.CAMPAIGN_ID)
  }

  constructor(private httpClient: HttpClient) {
  }

  // temporary method for partial backend implementation, it's going to fully replace `getActors()`
  getPlayerCharacters(): Observable<PlayerCharacter[]> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(this.demoPlayers);
    }
    return this.httpClient.get<PlayerCharacter[]>(this.playerCharactersUrl, this.httpOptions)
  }

  fromJson(data: any): Actor {
    let actor = new Actor(data.name, data.maxHp);

    actor.id = data.id;
    actor.currentHp = data.currentHp;
    actor.level = data.level;
    actor.type = BattleParticipantType.PLAYER_CHARACTER;
    actor.setTimeOfDeath(data.timeOfDeath);
    actor.setResurrectionPenalty(data.resurrectionPenalty);

    return actor;
  }

  updatePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<PlayerCharacter[]> {
    if(environment.environmentName == Environment.GHPAGES) {
      this.demoPlayers = playerCharacters;
      return of(this.demoPlayers);
    }
    console.log('updatePlayerCharacters invoked')
    return this.httpClient.post<PlayerCharacter[]>(this.playerCharactersUrl, playerCharacters, this.httpOptions);
  }

  updateCharactersAfterBattle(playersBattleFinishedRequests: PlayerBattleFinishedRequest[]):
    Observable<PlayerCharacter[]> {
    return this.httpClient.post<PlayerCharacter[]>(this.battleFinishedUrl,
      playersBattleFinishedRequests, this.httpOptions);
  }

  deletePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<unknown> {
    if(environment.environmentName == Environment.GHPAGES) {
      for (let pc of playerCharacters) {
        if (this.demoPlayers.indexOf(pc) > -1) {
          this.demoPlayers.splice(this.demoPlayers.indexOf(pc), 1);
        }
      }
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
