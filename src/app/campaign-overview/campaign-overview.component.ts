import { Component, OnInit } from '@angular/core';
import {CampaignService} from "../services/campaign/campaign.service";

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.css']
})
export class CampaignOverviewComponent implements OnInit {

  campaignName?: string;

  constructor(private campaignService: CampaignService) {
  }

  ngOnInit(): void {
    this.campaignName = this.getCampaignName();
  }

  getCampaignName(): string {
    console.log(this.campaignService.getSessionStorageCampaign())
    return this.campaignService.getSessionStorageCampaign().name;
  }


}
