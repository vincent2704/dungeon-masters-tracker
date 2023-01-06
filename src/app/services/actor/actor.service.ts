import {Injectable} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Environment} from "../../environment";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {PlayerBattleFinishedRequest} from "../../models/actors/playerBattleFinishedRequest";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly playerCharactersUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters`
  private readonly battleFinishedUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters/finish-battle`
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", Environment.CAMPAIGN_ID)
  }

  constructor(private httpClient: HttpClient) {
  }

  getPlayerCharacters(): Observable<PlayerCharacter[]> {
    return this.httpClient.get<PlayerCharacter[]>(this.playerCharactersUrl, this.httpOptions)
  }

  updatePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<PlayerCharacter[]> {
    return this.httpClient.post<PlayerCharacter[]>(this.playerCharactersUrl, playerCharacters, this.httpOptions);
  }

  updateCharactersAfterBattle(playersBattleFinishedRequests: PlayerBattleFinishedRequest[]):
    Observable<PlayerCharacter[]> {
    return this.httpClient.post<PlayerCharacter[]>(this.battleFinishedUrl,
      playersBattleFinishedRequests, this.httpOptions);
  }

  deletePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<unknown> {
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
