import { Component, OnInit, ViewChild } from '@angular/core';
import { Campaign } from "../../models/campaign/campaign";
import { User } from "../../models/user/user";
import { CampaignService } from "../../services/campaign/campaign.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbCalendar, NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";
import { Router } from "@angular/router";
import { ActorService } from "../../services/actor/actor.service";
import { CampaignCreationRequest } from "../../models/campaign/campaignCreationRequest";

@Component({
  selector: 'app-campaign-selector',
  templateUrl: './campaign-selector.component.html',
  styleUrls: ['./campaign-selector.component.css']
})
export class CampaignSelectorComponent implements OnInit {

  campaignId: string = '';
  campaigns: Campaign[] = []
  isCampaignCreationCollapsed: boolean = true;

  campaignStartTime = {
    hour: 12,
    minute: 0,
    second: 0
  }
  campaignStartDate?: NgbDateStruct;

  campaignCreationFormGroup = new FormGroup({
    campaignName: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(50)
    ]),
    calendarSystem: new FormControl('', [
      Validators.required
    ]),
    campaignStartDate: new FormControl('', [
      // Validators.required  <- marked as not required atm because a minor bug.
      // when required, although all the requirements are met, the button is disabled and user has to click somewhere
      // in order for the button to be enabled. the values are predefined for the date and time at start
    ]),
    campaignStartTime: new FormControl('', [
      // Validators.required
    ])
  })

  @ViewChild('campaignCreationFailModal')
  campaignCreationFailModal!: any;

  @ViewChild('campaignDeletedModal')
  campaignDeletedModal!: any;

  @ViewChild('campaignLoadFailedModal')
  campaignLoadFailedModal!: any;

  constructor(private campaignService: CampaignService, private playerCharacterService: ActorService,
              private modalService: NgbModal, private router: Router, private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('current_user')!);
    this.campaignStartDate = this.calendar.getToday();
    this.campaigns = user.campaigns;
  }

  createCampaign() {
    console.log(`sending request: ${JSON.stringify(this.campaignCreationFormGroup.value)}`)

    const campaignCreationRequest = this.prepareCampaignCreationRequest();
    this.campaignService.createCampaign(campaignCreationRequest)
      .subscribe(response => {
        this.campaignCreationFormGroup.reset();
        this.campaigns.push(response)
        LocalStorageUtils.addCampaign(response);
      }, () => {
        this.modalService.open(this.campaignCreationFailModal);
        console.error(`Failed to create campaign: ${JSON.stringify(this.campaignCreationFormGroup.value)}`);
      })
  }

  loadCampaign(campaign: Campaign): void {
    this.campaignService.getCampaign(campaign)
      .subscribe(response => {
        localStorage.setItem('current_campaign', JSON.stringify(response));
        this.playerCharacterService.getPlayerCharacters()
          .subscribe(response => {
            LocalStorageUtils.setPlayerCharacters(response)
            this.router.navigate(['/campaign-overview']);
          })
      }, () => this.modalService.open(this.campaignLoadFailedModal))
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  deleteCampaign(campaign: Campaign) {
    this.campaignService.deleteCampaign(campaign.id)
      .subscribe(() => {
        this.modalService.open(this.campaignDeletedModal);
        const campaignIndex = this.campaigns.indexOf(campaign);
        this.campaigns.splice(campaignIndex, 1);
        LocalStorageUtils.deleteCampaign(campaign);
      }, () => console.log(`Failed to delete campaign: ${JSON.stringify(campaign)}`));
  }

  isGregorianCalendarSelected() {
    return this.campaignCreationFormGroup.controls.calendarSystem.value == 'GREGORIAN'
  }

  prepareCampaignCreationRequest(): CampaignCreationRequest {
    const formGroupControls = this.campaignCreationFormGroup.controls
    return {
      campaignName: formGroupControls['campaignName'].value,
      calendarSystem: formGroupControls['calendarSystem'].value,
      campaignStartDateTime: {
        date: formGroupControls['campaignStartDate'].value,
        time: formGroupControls['campaignStartTime'].value
      }
    } as CampaignCreationRequest;
  }

}
