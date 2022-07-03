import { Component, OnInit } from '@angular/core';
import {CampaignEvent} from "../../models/campaign-events/campaignEvent";

@Component({
  selector: 'app-campaign-events',
  templateUrl: './campaign-events.component.html',
  styleUrls: ['./campaign-events.component.css']
})
export class CampaignEventsComponent implements OnInit {

  isCollapsed: boolean = true;
  events: CampaignEvent[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
