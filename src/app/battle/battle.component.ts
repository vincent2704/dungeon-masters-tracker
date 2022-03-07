import {Component, OnInit, ViewChild} from '@angular/core';
import {Actor} from "../models/actor";
import {ActorService} from "../services/actor.service";
import {Condition} from "../models/Condition";
import {BattleCondition} from "../models/battleCondition";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  isBattleStarted: boolean = false;
  actors: Actor[] = []; //TODO: observable from ActorService?
  round: number = 1;
  CONDITIONS: Condition[] = Condition.CONDITIONS;

  // condition form
  conditionToAdd!: Condition;
  conditionToAddDuration: number = 0;

  @ViewChild('initiativeConflictModal')
  conflictModal!: any;
  conflictedActors: Actor[] = [];
  conflictedActorsToPriorityOrderNumbersMap: Map<Actor, number> = new Map<Actor, number>();

  constructor(private actorService: ActorService, private modalService: NgbModal, private modalConfig: NgbModalConfig) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit(): void {
  }

  changeBattleStatus(): void {
    if (!this.isBattleStarted) {
      this.actors = this.actorService.sortActorsByInitiative();
      this.resolveInitiativeConflicts();
      //TODO: battle started will have to be set only if all conflicts are resolved!
      this.isBattleStarted = true;
    } else {
      //TODO: missing test case - saves protagonists only after battle end with their current HP
      this.actors = this.actorService.resetActors();
      this.isBattleStarted = false;
      this.round = 1;
    }
  }

  resolveInitiativeConflicts() {
    let initiativeToActorsMap: Map<number, Actor[]> = this.getInitiativeToActorsMap();
    for (let actors of initiativeToActorsMap.values()) {
      if (actors.length > 1) {
        this.conflictedActors = actors;
        this.modalService.open(this.conflictModal);
        // then methods onActorPriorityEntered() and onResolveConflict() are called from the modal
      }
    }
  }

  progressActor(actor: Actor): void {
    this.actorService.progressActor(actor);
    if (this.actorService.allActorsProgressed()) {
      this.progressRound();
    }
  }

  progressRound() {
    this.round++;
    this.actorService.resetActorsProgress();
  }

  isActorProgressed(actorToCheck: Actor): boolean {
    return actorToCheck.isActorTurnProgressed();
  }

  setConditionToAdd(event: Event) {
    let conditionName = (<HTMLInputElement>event.target).value;
    for (let condition of this.CONDITIONS) {
      if (condition.getName() === conditionName) {
        this.conditionToAdd = condition;
      }
    }
  }

  setConditionToAddDuration(event: Event) {
    this.conditionToAddDuration = parseInt((<HTMLInputElement>event.target).value);
    (<HTMLInputElement>event.target).value = '';
  }

  onSubmitHP(actor: Actor, event: any) {
    actor.modifyHp(event.target.value);
    (<HTMLInputElement>event.target).value = '';
  }

  onSubmitCondition(actor: Actor) {
    let battleCondition = new BattleCondition(this.conditionToAdd, this.conditionToAddDuration);
    this.actorService.addBattleCondition(actor, battleCondition);
  }

  onResolveConflict() {
    this.actors = this.actorService.getInitiativeConflictResolvedActors(this.conflictedActorsToPriorityOrderNumbersMap);
    this.conflictedActorsToPriorityOrderNumbersMap.clear();
    this.modalService.dismissAll();
  }

  onActorPriorityEntered(actor: Actor, priorityEvent: any) {
    let priority: number = parseInt((<HTMLInputElement>priorityEvent.target).value);
    this.conflictedActorsToPriorityOrderNumbersMap.set(actor, priority);
  }

  private getInitiativeToActorsMap(): Map<number, Actor[]> {
    let initiativeToActorsMap: Map<number, Actor[]> = new Map<number, Actor[]>();
    this.actors.map(actor => {
      let key = actor.getInitiative();
      let isInitiativePresentInMap = initiativeToActorsMap.get(key);
      if (!isInitiativePresentInMap) {
        initiativeToActorsMap.set(key, [actor]);
      } else {
        initiativeToActorsMap.get(key)!.push(actor);
      }
    });
    return initiativeToActorsMap;
  }

}
