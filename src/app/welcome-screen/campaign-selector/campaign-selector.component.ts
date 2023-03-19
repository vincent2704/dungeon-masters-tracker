import { Component, OnInit } from '@angular/core';
import {CampaignService} from "../../services/campaign/campaign.service";

@Component({
  selector: 'app-campaign-selector',
  templateUrl: './campaign-selector.component.html',
  styleUrls: ['./campaign-selector.component.css']
})
export class CampaignSelectorComponent implements OnInit {

  campaignId: string = '';

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.campaignService.reloadCampaign(this.campaignId);
  }

}
