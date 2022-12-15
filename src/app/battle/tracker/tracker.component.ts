import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {TemporalService} from "../../services/temporal/temporal.service";
import {ActorService} from "../../services/actor/actor.service";
import {PlayerCharacter} from "../../models/actors/playerCharacter";
import {BackendCondition} from "../../models/actors/backendCondition";

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
    return actor.isKnockedDown() && !actor.isDead();
  }

  progressRound(): void {
    this.round++;
    this.progressedActors = [];
  }

  isActorProgressed(actorToCheck: Actor): boolean {
    return this.progressedActors.includes(actorToCheck);
  }

  addActor(actorInitiativePair: [playerCharacter: Actor, initiative: number]) {
    this.actors.push(actorInitiativePair[0]);
  }

  onSubmitHP(actor: Actor, event: any): void {
    let hpModifier = parseInt(event.target.value);

    if(this.isDamage(hpModifier)) {
      if(actor.isKnockedDown()) {
        this.unconsciousActorsReceivingDamage.set(actor, true);
      } else {
        this.unconsciousActorsReceivingDamage.set(actor, false);
      }
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

  endBattle() {
    this.updateCharacters();
    if (this.isTimeTracked) {
      this.temporalService.addSeconds((this.round - 1) * 6);
    }
    this.round = 1;
    this.battleEndedEmitter.emit();
  }

  isUnconsciousActorReceivingDamage(actor: Actor): boolean {
    return this.unconsciousActorsReceivingDamage.get(actor) === true;
  }

  onDamageReceived(actor: Actor) {
    this.unconsciousActorsReceivingDamage.set(actor, false);
  }

  private isDamage(hitPointModifier: number): boolean {
    return hitPointModifier < 0;
  }

  private updateCharacters(): void {
    this.actorService.updatePlayerCharacters(this.retrievePlayerCharacters(this.actors))
      .subscribe(response => response,
          error => console.error(`Updating player characters failed. Error: ${error}`));
  }

  private allActorsProgressed(): boolean {
    return this.actors.length === this.progressedActors.length;
  }

  private retrievePlayerCharacters(actors: Actor[]) {
    return actors
      .filter(actor => actor.isEligibleForDeathSavingThrows())
      .map(playerActor => {
        let conditions = playerActor.getConditions()
          .map(battleCondition => {
            return {
              conditionName: battleCondition.getCondition().getName(),
              permanent: battleCondition.permanent,
              turnsLeft: battleCondition.getDurationInTurns()
            } as BackendCondition
          })

        return ({
          id: playerActor.id,
          name: playerActor.name,
          level: playerActor.level,
          maxHp: playerActor.maxHp,
          currentHp: playerActor.maxHp,
          conditions: conditions
        }) as PlayerCharacter
      })
  }

}
