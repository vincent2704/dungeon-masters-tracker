import { Injectable } from '@angular/core';
import { Actor } from "../../models/actors/actor";
import { Condition } from "../../models/Condition";
import { BattleCondition } from "../../models/battleCondition";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { CampaignService } from "../campaign/campaign.service";
import { environment } from "../../../environments/environment";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private readonly playerCharactersUrl: string = `${environment.apiUrl}/v1/campaigns`

  constructor(private httpClient: HttpClient, private campaignService: CampaignService) {
  }

  getPlayerCharacters(): Observable<PlayerCharacter[]> {
    const currentUser = LocalStorageUtils.getUser();
    const campaignId = LocalStorageUtils.getCampaign().id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Tracker-Username': currentUser.username
      })
    }
    return this.httpClient.get<PlayerCharacter[]>(`${this.playerCharactersUrl}/${campaignId}/player-characters`, httpOptions)
  }

  updatePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<PlayerCharacter[]> {

    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
    }
    return this.httpClient.post<PlayerCharacter[]>(this.playerCharactersUrl, playerCharacters, httpOptions);
  }

  deletePlayerCharacters(playerCharacters: PlayerCharacter[]): Observable<unknown> {

    const httpOptions = {
      params: new HttpParams().append("campaignId", this.campaignService.getLocalStorageCampaign().id)
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
