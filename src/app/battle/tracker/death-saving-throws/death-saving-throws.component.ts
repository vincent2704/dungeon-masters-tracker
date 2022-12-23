import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../../models/actors/actor";
import {Condition} from "../../../models/Condition";
import {CampaignService} from "../../../services/campaign/campaign.service";
import {HitType} from "../../../models/combat-data/HitType";

@Component({
  selector: 'app-death-saving-throws',
  templateUrl: './death-saving-throws.component.html',
  styleUrls: ['./death-saving-throws.component.css']
})
export class DeathSavingThrowsComponent implements OnInit {
  @Input()
  actor!: Actor;

  @Input()
  actorReceivingDamage!: boolean;

  @Output()
  damageReceivedEmitter = new EventEmitter<void>();

  successes: number = 0;
  failures: number = 0;

  constructor(private temporalService: CampaignService) { }

  ngOnInit(): void {
  }

  isStabilized(): boolean {
    return this.actor.isStabilized();
  }

  success() {
    this.successes++;
    if(this.successes == 3) {
      this.stabilize();
    }
  }

  failure() {
    this.failures++;
    if(this.failures >= 3) {
      this.actor.kill(new Date(this.temporalService.getSessionStorageCampaign().campaignDateTimeCurrentEpoch));
    }
  }

  criticalSuccess() {
    this.actor.setStabilized(true);
    this.actor.modifyHp(1, new Date(this.temporalService.getSessionStorageCampaign().campaignDateTimeCurrentEpoch));
    this.actor.removeCondition(Condition.UNCONSCIOUS);
  }

  criticalFail() {
    this.failures += 2;
    if(this.failures >= 3) {
      this.actor.kill(new Date(this.temporalService.getSessionStorageCampaign().campaignDateTimeCurrentEpoch));
    }
  }

  onDamageReceived(event: HitType) {
    if(event === HitType.CRITICAL_HIT) {
      this.criticalFail();
    } else {
      this.failure();
    }
    this.damageReceivedEmitter.emit();
  }

  stabilize() {
    this.actor.setStabilized(true);
    this.successes = 0;
    this.failures = 0;
  }

  showUnconsciousDamageComponent(): boolean {
    return this.actorReceivingDamage && this.actor.getCurrentHP() === 0;
  }

}
