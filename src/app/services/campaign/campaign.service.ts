import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {Campaign} from "../../models/campaign/campaign";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";
import {CampaignCreationRequest} from "../../models/campaign/campaignCreationRequest";
import {User} from "../../models/user/user";
import {environment} from "../../../environments/environment";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";
import { LongRestRequest } from "../../models/campaign/resting/longRestRequest";
import { LongRestResponse } from "../../models/campaign/resting/longRestResponse";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { BattleFinishRequest } from "../../models/campaign/battleFinishRequest";
import { BattleFinishedResponse } from "../../models/campaign/battleFinishedResponse";
import { PlayerShortRestInput } from "../../models/campaign/resting/playerShortRestInput";
import { RestResponse } from "../../models/campaign/resting/restResponse";
import { ShortRestRequest } from "../../models/campaign/resting/shortRestRequest";

/*
  Service that manages campaign data
 */
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaignId: string = '';
  private campaignUrl: string = `${environment.apiUrl}/v1/campaigns`;
  private readonly CAMPAIGN_STORAGE_KEY = 'current_campaign'

  constructor(private httpClient: HttpClient) {
  }

  createCampaign(campaignCreationRequest: CampaignCreationRequest): Observable<Campaign> {
    const currentUser: User = JSON.parse(localStorage.getItem('current_user')!);
    const httpOptions = {
      headers: new HttpHeaders({
        'Tracker-Username': currentUser.username
      })
    }
    return this.httpClient.post<Campaign>(this.campaignUrl, campaignCreationRequest, httpOptions)
  }

  getCampaign(campaign?: Campaign): Observable<Campaign> {
    if (campaign) {
      return this.httpClient.get<Campaign>(`${this.campaignUrl}/${campaign.id}`);
    }
    return this.httpClient.get<Campaign>(`${this.campaignUrl}/${this.getLocalStorageCampaign().id}`);
  }

  reloadCampaign(campaignId?: string) {
    if (campaignId) {
      this.campaignId = campaignId;
    } else {
      this.campaignId = this.getLocalStorageCampaign().id;
    }
    this.getCampaign()
      .subscribe(response => {
        let campaign = {
          id: response.id,
          name: response.name,
          campaignDateTimeStart: response.campaignDateTimeStart,
          campaignDateTimeCurrent: response.campaignDateTimeCurrent,
          lastLongRestDateTime: response.lastLongRestDateTime
        } as Campaign;
        localStorage.setItem(this.CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
      })
  }

  updateCampaign(campaignId: string, request: CampaignUpdateRequest): Observable<Campaign> {
    const currentUser = LocalStorageUtils.getUser();
    const httpOptions = {
      headers: new HttpHeaders({
        'Tracker-Username': currentUser.username
      })
    }
    return this.httpClient.put<Campaign>(`${this.campaignUrl}/${campaignId}`, request, httpOptions);
  }

  deleteCampaign(campaignId: string): Observable<unknown> {
    const currentUser: User = JSON.parse(localStorage.getItem('current_user')!);
    const httpOptions = {
      headers: new HttpHeaders({
        'Tracker-Username': currentUser.username
      })
    }
    return this.httpClient.delete<unknown>(`${this.campaignUrl}/${campaignId}`, httpOptions)
  }

  performLongRest(longRestRequest: LongRestRequest): Observable<LongRestResponse> {
    const currentUser: User = LocalStorageUtils.getUser();
    const currentCampaignId: string = LocalStorageUtils.getCampaign().id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Tracker-Username': currentUser.username
      })
    }
    return this.httpClient.post<LongRestResponse>(
      `${this.campaignUrl}/${currentCampaignId}/long-rest`, longRestRequest, httpOptions);
  }

  performShortRest(restDurationInHours: number, shortRestInput: PlayerShortRestInput[]) {
    const campaignId = LocalStorageUtils.getCampaign().id;
    const currentUser: User = LocalStorageUtils.getUser();
    const httpOptions = {
      headers: new HttpHeaders({
        'Tracker-Username': currentUser.username
      })
    }
    const shortRestRequest: ShortRestRequest = {
      hours: restDurationInHours,
      playerShortRestData: shortRestInput
    }

    return this.httpClient.post<RestResponse>(`${this.campaignUrl}/${campaignId}/short-rest`, shortRestRequest,
      httpOptions);
  }

  finishBattle(finishBattleRequest: BattleFinishRequest):
    Observable<BattleFinishedResponse> {

    const currentUser: User = LocalStorageUtils.getUser();
    const currentCampaignId: string = LocalStorageUtils.getCampaign().id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Tracker-Username': currentUser.username
      })
    }
    return this.httpClient.post<BattleFinishedResponse>(`${this.campaignUrl}/${currentCampaignId}/finish-battle`,
      finishBattleRequest, httpOptions);
  }

  // setCurrentDate(newDate: Date): Observable<Campaign> {
  //   const updateRequest: CampaignUpdateRequest = {
  //     campaignCurrentDateTime: newDate.getTime()
  //   }
  //
  //   return this.httpClient.put<Campaign>(this.campaignUrl + this.campaignId, updateRequest);
  // }

  updateLocalStorageCampaign(campaign: Campaign): void {
    localStorage.setItem(this.CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
  }

  getLocalStorageCampaign(): Campaign {
    const localStorageCampaign = localStorage.getItem(this.CAMPAIGN_STORAGE_KEY);
    if (localStorageCampaign) {
      return JSON.parse(localStorageCampaign);
    }
    return {} as Campaign;
  }

}
