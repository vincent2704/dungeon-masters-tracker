import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../../models/actor";
import {Condition} from "../../../models/Condition";
import {TemporalService} from "../../../services/temporal/temporal.service";
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

  constructor(private temporalService: TemporalService) { }

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
      this.actor.kill(this.temporalService.getCurrentDate());
    }
  }

  criticalSuccess() {
    this.actor.setStabilized(true);
    this.actor.modifyHp(1, this.temporalService.getCurrentDate());
    this.actor.removeCondition(Condition.UNCONSCIOUS);
  }

  criticalFail() {
    this.failures += 2;
    if(this.failures >= 3) {
      this.actor.kill(this.temporalService.getCurrentDate());
    }
  }

  onDamageReceived(event: HitType) {
    if(event === HitType.CRITICAL_HIT) {
      this.criticalFail();
    } else {
      this.failure();
    }
    this.damageReceivedEmitter.emit();
    console.log(`DeathSavingThrowsComponent: emitting damage received for ${this.actor.name}`)
  }

  stabilize() {
    this.actor.setStabilized(true);
    this.successes = 0;
    this.failures = 0;
  }

  showUnconsciousDamageComponent(): boolean {
    console.log(`${Date.now()}: ${this.actor.name} receiving damage: ${this.actorReceivingDamage}`);
    // console.log(`${this.actor.name} current HP: ${this.actor.getCurrentHP()}`);
    return this.actorReceivingDamage && this.actor.getCurrentHP() === 0;
  }

}
