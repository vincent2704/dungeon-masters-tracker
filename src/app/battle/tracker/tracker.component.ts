import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actor";
import {TemporalService} from "../../services/temporal/temporal.service";
import {ActorService} from "../../services/actor/actor.service";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  round: number = 1;
  isTimeTracked: boolean = true;

  @Input()
  actors!: Actor[];
  progressedActors: Actor[] = [];

  @Output()
  battleEndedEmitter = new EventEmitter<void>();

  unconsciousActorsReceivingDamage: Map<Actor, boolean> = new Map<Actor, boolean>();

  constructor(private temporalService: TemporalService, private actorService: ActorService) {
  }

  ngOnInit(): void {
    for (let actor of this.actors) {
      this.unconsciousActorsReceivingDamage.set(actor, false);
    }
  }

  progressActor(actor: Actor): void {
    this.progressedActors.push(actor);
    actor.decrementConditionsDuration();
    actor.decrementTemporaryHitPointDuration();
    if (this.allActorsProgressed()) {
      this.progressRound();
    }
  }

  showDeathSavingThrows(actor: Actor): boolean {
    return actor.isKnockedDown() && !actor.isStabilized() && !actor.isDead();
  }

  progressRound(): void {
    this.round++;
    this.progressedActors = [];
  }

  isActorProgressed(actorToCheck: Actor): boolean {
    return this.progressedActors.includes(actorToCheck);
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
  }

  onSubmitHP(actor: Actor, event: any): void {
    let hpModifier = parseInt(event.target.value);

    if (actor.isKnockedDown() && this.isDamage(hpModifier)) {
      this.unconsciousActorsReceivingDamage.set(actor, true);
    }

    let timeSinceBattleStartedInMilliseconds = (this.round - 1) * 6000;
    if (this.isTimeTracked) {
      actor.modifyHp(hpModifier,
        new Date(this.temporalService.getCurrentDate().getTime() + timeSinceBattleStartedInMilliseconds)
      );
    } else {
      actor.modifyHp(hpModifier, this.temporalService.getCurrentDate());
    }

    (<HTMLInputElement>event.target).value = '';
  }

  showUnconsciousDamage(actor: Actor): boolean {
    return actor.isKnockedDown() && this.unconsciousActorsReceivingDamage.get(actor) === true;
  }

  endBattle() {
    this.updateCharacters();
    if (this.isTimeTracked) {
      this.temporalService.addSeconds((this.round - 1) * 6);
    }
    this.round = 1;
    this.battleEndedEmitter.emit();
  }

  private isDamage(hitPointModifier: number): boolean {
    return hitPointModifier < 0;
  }

  private updateCharacters(): void {
    this.actorService.updateActors(this.actors);
  }

  private allActorsProgressed(): boolean {
    return this.actors.length === this.progressedActors.length;
  }

}
