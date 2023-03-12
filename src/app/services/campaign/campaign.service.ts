import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campaign} from "../../models/campaign/campaign";
import {Environment} from "../../environment";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";

/*
  Service that manages campaign data
 */
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaignId: string = '';
  private campaignUrl: string = `${Environment.HOST_ADDRESS}/v1/campaigns/`;
  private readonly CAMPAIGN_STORAGE_KEY = 'campaign'

  constructor(private httpClient: HttpClient) {
  }

  getCampaign(): Observable<Campaign> {
    return this.httpClient.get<Campaign>(this.campaignUrl + this.campaignId);
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
        localStorage.setItem('campaign', JSON.stringify(campaign));
      })
  }

  updateCampaign(request: CampaignUpdateRequest): Observable<Campaign> {
    return this.httpClient.put<Campaign>(this.campaignUrl + this.campaignId, request);
  }

  setCurrentDate(newDate: Date): Observable<Campaign> {
    const updateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: newDate.getTime()
    }

    return this.httpClient.put<Campaign>(this.campaignUrl + this.campaignId, updateRequest);
  }

  updateLocalStorageCampaign(campaign: Campaign): void {
    localStorage.setItem('campaign', JSON.stringify(campaign));
  }

  getLocalStorageCampaign(): Campaign {
    const localStorageCampaign = localStorage.getItem(this.CAMPAIGN_STORAGE_KEY);
    if(localStorageCampaign) {
      return JSON.parse(localStorageCampaign);
    }
    return {} as Campaign;
  }

}
