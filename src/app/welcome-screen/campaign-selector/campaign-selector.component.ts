import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../models/campaign/campaign";
import {User} from "../../models/user/user";
import {CampaignService} from "../../services/campaign/campaign.service";

@Component({
  selector: 'app-campaign-selector',
  templateUrl: './campaign-selector.component.html',
  styleUrls: ['./campaign-selector.component.css']
})
export class CampaignSelectorComponent implements OnInit {

  campaignId: string = '';
  campaigns: Campaign[] = []

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('current_user')!);
    this.campaigns = user.campaigns;
  }

  getLastPlayed(campaign: Campaign): Date {
    return campaign.realDateLastPlayed;
  }

  onConfirm() {

  }

  loadCampaign(campaign: Campaign): void {
    this.campaignService.reloadCampaign(campaign.id);
  }
}
