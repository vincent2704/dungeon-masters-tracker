import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../models/campaign/campaign";
import {User} from "../../models/user/user";
import {CampaignService} from "../../services/campaign/campaign.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-campaign-selector',
  templateUrl: './campaign-selector.component.html',
  styleUrls: ['./campaign-selector.component.css']
})
export class CampaignSelectorComponent implements OnInit {

  campaignId: string = '';
  campaigns: Campaign[] = []
  isCampaignCreationCollapsed: boolean = true;

  campaignCreationFormGroup = new FormGroup({
    campaignName: new FormControl(''),
    calendarSystem: new FormControl('')
  })

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('current_user')!);
    this.campaigns = user.campaigns;
  }

  getLastPlayed(campaign: Campaign): Date {
    return campaign.realDateLastPlayed;
  }

  onSubmit() {
    this.campaignService.createCampaign(this.campaignCreationFormGroup.value)
      .subscribe(response => {
        this.campaignCreationFormGroup.reset();
        this.campaigns.push(response)
      }, () => console.error(`Failed to create campaign:
      ${JSON.stringify(this.campaignCreationFormGroup.value)}`))
  }

  loadCampaign(campaign: Campaign): void {
    this.campaignService.getCampaign(campaign)
      .subscribe(response => {
        localStorage.setItem('current_campaign', JSON.stringify(response));
      })
  }
}
