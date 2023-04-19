import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {CampaignService} from "../../services/campaign/campaign.service";
import {ActorService} from "../../services/actor/actor.service";
import {PlayerBattleFinishedRequest} from "../../models/actors/playerBattleFinishedRequest";
import {BattleParticipantType} from "../../models/actors/battleParticipantType";
import {CampaignUpdateRequest} from "../../models/campaign/campaignUpdateRequest";
import {Settings} from "../../services/settings/settings";
import {AbilitySet} from "../../models/common/ability/abilitySet";
import {ActorUtils} from "../../utilities/actor/actorUtils";
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
  battleEndedEmitter = new EventEmitter<Actor[]>();

  unconsciousActorsReceivingDamage: Map<Actor, boolean> = new Map<Actor, boolean>();
  monsterWithActionsShown: Map<string, boolean> = new Map<string, boolean>();
  monsterWithSavingThrowsShown: Map<string, boolean> = new Map<string, boolean>();

  constructor(private campaignService: CampaignService, private actorService: ActorService) {
  }

  ngOnInit(): void {
    this.round = 1;
    for (let actor of this.actors) {
      this.unconsciousActorsReceivingDamage.set(actor, false);
      if(Settings.isAutoLoadMonsterActions() && actor.getMonster()) {
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
    this.actorService.updateCharactersAfterBattle(battleFinishRequests)
      .subscribe(response => {
          if (this.isTimeTracked) {
            const campaign = this.campaignService.getLocalStorageCampaign();
            const campaignUpdateRequest: CampaignUpdateRequest = {
              campaignDateTimeCurrentEpoch: campaign.campaignDateTimeCurrentEpoch + (this.round - 1) * 6_000
            }
            this.campaignService.updateCampaign(campaign.id, campaignUpdateRequest)
              .subscribe(response => this.campaignService.updateLocalStorageCampaign(response));
          }
          this.battleEndedEmitter.emit(ActorUtils.fromJsonArray(response));
        },
        error => console.error(`Updating player characters failed. Error: ${error}`));
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
    if(this.monsterWithActionsShown.get(actor.getName())) {
      this.monsterWithActionsShown.set(actor.getName(), false);
    } else {
      this.monsterWithActionsShown.set(actor.getName(), true)
    }
  }

  isShowActions(actor: Actor): boolean {
    return !!this.monsterWithActionsShown.get(actor.getName());
  }

  toggleShowSavingThrows(actor: Actor): void {
    if(this.monsterWithSavingThrowsShown.get(actor.getName())) {
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
    if(actorMonster) {
      return actorMonster.getDetails().getAbilitySet();
    }
    return undefined;
  }
}
