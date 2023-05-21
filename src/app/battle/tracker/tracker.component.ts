import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from "../../models/actors/actor";
import { CampaignService } from "../../services/campaign/campaign.service";
import { PlayerBattleFinishedRequest } from "../../models/actors/playerBattleFinishedRequest";
import { BattleParticipantType } from "../../models/actors/battleParticipantType";
import { Settings } from "../../services/settings/settings";
import { AbilitySet } from "../../models/common/ability/abilitySet";
import { BattleFinishRequest } from "../../models/campaign/battleFinishRequest";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

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
  monsterWithActionsShown: Map<string, boolean> = new Map<string, boolean>();
  monsterWithSavingThrowsShown: Map<string, boolean> = new Map<string, boolean>();

  constructor(private campaignService: CampaignService) {
  }

  ngOnInit(): void {
    this.round = 1;
    for (let actor of this.actors) {
      this.unconsciousActorsReceivingDamage.set(actor, false);
      if (Settings.isAutoLoadMonsterActions() && actor.getMonster()) {
        this.monsterWithActionsShown.set(actor.getName(), true);
      }
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

    if (this.isDamage(hpModifier)) {
      if (actor.isKnockedDown()) {
        this.unconsciousActorsReceivingDamage.set(actor, true);
      } else {
        this.unconsciousActorsReceivingDamage.set(actor, false);
      }
    }

    let timeSinceBattleStartedInMilliseconds = (this.round - 1) * 6000;
    if (this.isTimeTracked) {
      actor.modifyHp(hpModifier,
        new Date(this.campaignService.getLocalStorageCampaign().campaignDateTimeCurrentEpoch
          + timeSinceBattleStartedInMilliseconds)
      );
    } else {
      actor.modifyHp(
        hpModifier, new Date(this.campaignService.getLocalStorageCampaign().campaignDateTimeCurrentEpoch));
    }

    (<HTMLInputElement>event.target).value = '';
  }

  endBattle() {
    let playerCharacterActors: Actor[] = this.actors.filter(
      actor => {
        return actor.type == BattleParticipantType.PLAYER_CHARACTER && actor.id
      });
    let battleFinishRequests: PlayerBattleFinishedRequest[] = this.createBattleFinishRequests(playerCharacterActors)
    const battleSecondsPassed = this.isTimeTracked
      ? this.round - 1
      : 0;
    const battleFinishedRequest: BattleFinishRequest = {
      battleTimeInSeconds: battleSecondsPassed,
      playerBattleFinishedRequests: battleFinishRequests
    }
    this.campaignService.finishBattle(battleFinishedRequest)
      .subscribe(response => {
          LocalStorageUtils.setCurrentCampaign(response.campaign)
          LocalStorageUtils.setPlayerCharacters(response.playerCharacters);
          this.battleEndedEmitter.emit()
        },
        error => console.error(`Updating player characters failed. Error:
          ${JSON.stringify(error)}`));
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

  private allActorsProgressed(): boolean {
    return this.actors.length === this.progressedActors.length;
  }

  private createBattleFinishRequests(actors: Actor[]): PlayerBattleFinishedRequest[] {
    return actors.map(actor => {
      return {
        playerId: actor.getId(),
        playerCurrentHp: actor.getCurrentHP(),
        timeOfDeath: actor.getTimeOfDeath()
      } as PlayerBattleFinishedRequest
    })
  }

  isMonster(actor: Actor): boolean {
    return actor.type == BattleParticipantType.MONSTER;
  }

  toggleShowActions(actor: Actor): void {
    if (this.monsterWithActionsShown.get(actor.getName())) {
      this.monsterWithActionsShown.set(actor.getName(), false);
    } else {
      this.monsterWithActionsShown.set(actor.getName(), true)
    }
  }

  isShowActions(actor: Actor): boolean {
    return !!this.monsterWithActionsShown.get(actor.getName());
  }

  toggleShowSavingThrows(actor: Actor): void {
    if (this.monsterWithSavingThrowsShown.get(actor.getName())) {
      this.monsterWithSavingThrowsShown.set(actor.getName(), false);
    } else {
      this.monsterWithSavingThrowsShown.set(actor.getName(), true)
    }
  }

  isShowSavingThrows(actor: Actor): boolean {
    return !!this.monsterWithSavingThrowsShown.get(actor.getName());
  }

  getAbilitySet(actor: Actor): AbilitySet | undefined {
    const actorMonster = actor.getMonster();
    if (actorMonster) {
      return actorMonster.getDetails().getAbilitySet();
    }
    return undefined;
  }
}
