import {Injectable} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Environment} from "../../environment";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {PlayerBattleFinishedRequest} from "../../models/actors/playerBattleFinishedRequest";
import {Settings} from "../settings/settings";
import {CampaignService} from "../campaign/campaign.service";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly playerCharactersUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters`
  private readonly battleFinishedUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters/finish-battle`

  constructor(private httpClient: HttpClient, private campaignService: CampaignService) {
  }

  getPlayerCharacters(): Observable<PlayerCharacter[]> {

    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getCampaignId())
    }
    console.log(Settings.getCampaignIdTextFieldValue());
    return this.httpClient.get<PlayerCharacter[]>(this.playerCharactersUrl, httpOptions)
  }

  updatePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<PlayerCharacter[]> {

    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getCampaignId())
    }
    return this.httpClient.post<PlayerCharacter[]>(this.playerCharactersUrl, playerCharacters, httpOptions);
  }

  updateCharactersAfterBattle(playersBattleFinishedRequests: PlayerBattleFinishedRequest[]):
    Observable<PlayerCharacter[]> {

    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getCampaignId())
    }
    return this.httpClient.post<PlayerCharacter[]>(this.battleFinishedUrl,
      playersBattleFinishedRequests, httpOptions);
  }

  deletePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<unknown> {

    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getCampaignId())
    }
    let charactersToDeleteIds = playerCharacters.map(character => character.id);
    let options = {
      params: httpOptions.params,
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
