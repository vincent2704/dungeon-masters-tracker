import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campaign} from "../../models/campaign/campaign";
import {Environment} from "../../environment";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";
import {CampaignCreationRequest} from "../../models/campaign/campaignCreationRequest";
import {User} from "../../models/user/user";

/*
  Service that manages campaign data
 */
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaignId: string = '';
  private campaignUrl: string = `${Environment.HOST_ADDRESS}/v1/campaigns`;
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
          campaignDateTimeStartEpoch: response.campaignDateTimeStartEpoch,
          campaignDateTimeCurrentEpoch: response.campaignDateTimeCurrentEpoch,
          lastLongRestTimeEpoch: response.lastLongRestTimeEpoch
        } as Campaign;
        localStorage.setItem(this.CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
      })
  }

  updateCampaign(request: CampaignUpdateRequest): Observable<Campaign> {
    return this.httpClient.put<Campaign>(this.campaignUrl + this.campaignId, request);
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

  setCurrentDate(newDate: Date): Observable<Campaign> {
    const updateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: newDate.getTime()
    }

    return this.httpClient.put<Campaign>(this.campaignUrl + this.campaignId, updateRequest);
  }

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
