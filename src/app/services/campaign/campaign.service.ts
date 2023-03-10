import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campaign} from "../../models/campaign/campaign";
import {Environment} from "../../environment";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";
import {Settings} from "../settings/settings";

/*
  Service that manages campaign data
 */
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private readonly campaignUrl: string = `${Environment.HOST_ADDRESS}/v1/campaigns/${Settings.getCampaignId()}`
  private readonly CAMPAIGN_STORAGE_KEY = 'campaign'

  constructor(private httpClient: HttpClient) {
    this.getCampaign()
      .subscribe(response => {
        let campaign = {
          name: response.name,
          campaignDateTimeStartEpoch: response.campaignDateTimeStartEpoch,
          campaignDateTimeCurrentEpoch: response.campaignDateTimeCurrentEpoch,
          lastLongRestTimeEpoch: response.lastLongRestTimeEpoch
        } as Campaign;
        sessionStorage.setItem('campaign', JSON.stringify(campaign));
      })
  }

  getCampaign(): Observable<Campaign> {
    return this.httpClient.get<Campaign>(this.campaignUrl);
  }

  updateCampaign(request: CampaignUpdateRequest): Observable<Campaign> {
    return this.httpClient.put<Campaign>(this.campaignUrl, request);
  }

  setCurrentDate(newDate: Date): Observable<Campaign> {
    const updateRequest: CampaignUpdateRequest = {
      campaignDateTimeCurrentEpoch: newDate.getTime()
    }

    return this.httpClient.put<Campaign>(this.campaignUrl, updateRequest);
  }

  updateSessionStorageCampaign(campaign: Campaign): void {
    sessionStorage.setItem('campaign', JSON.stringify(campaign));
  }

  getSessionStorageCampaign(): Campaign {
    return JSON.parse(sessionStorage.getItem(this.CAMPAIGN_STORAGE_KEY) || "");
  }
}
