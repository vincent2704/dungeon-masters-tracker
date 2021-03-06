import {Component, OnInit, ViewChild} from '@angular/core';
import {Actor} from "../models/actor";
import {ActorService} from "../services/actor/actor.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {PrepareBattleComponent} from "./prepare-battle/prepare-battle.component";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  isBattleStarted: boolean = false;
  actors: Actor[] = [];

  @ViewChild('initiativeConflictModal')
  conflictModal!: any;

  @ViewChild('prepareBattleComponent')
  prepareBattleComponent!: PrepareBattleComponent;

  conflictedActors: Actor[] = [];
  conflictedActorsToPriorityOrderNumbersMap: Map<Actor, number> = new Map<Actor, number>();
  conflictResolvedActors: Actor[] = [];

  constructor(
    private actorService: ActorService,
    private modalService: NgbModal,
    private modalConfig: NgbModalConfig
  ) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit(): void {
  }

  startBattle(): void {
    this.actors = this.prepareBattleComponent.actors;
    this.actors = this.sortActorsByInitiative();
    this.resolveInitiativeConflicts();
    this.isBattleStarted = true;
  }

  endBattle(): void {
    this.isBattleStarted = false;
    this.conflictResolvedActors = [];
  }

  sortActorsByInitiative(): Actor[] {
    this.actors.sort(
      ((actor1, actor2) => actor2.getInitiative() - actor1.getInitiative()));
    return this.actors;
  }

  resolveInitiativeConflicts(): void {
    let initiativeToActorsMap: Map<number, Actor[]> = this.getInitiativeToActorsMap();
    for (let actors of initiativeToActorsMap.values()) {
      if (actors.length > 1 && !this.areActorsConflictsResolved(actors)) {
        this.conflictedActors = actors;
        this.modalService.open(this.conflictModal);
        return; // return to prevent asynchronous execution of the loop if there's an opened modal
        // then methods onActorPriorityEntered() and onClickResolveConflict() are called from the modal
      }
    }
  }

  areActorsConflictsResolved(actors: Actor[]): boolean {
    return actors.filter(actor => this.conflictResolvedActors.includes(actor))
      .length == actors.length;
  }

  onClickResolveConflict(): void {
    this.actors = this.getInitiativeConflictResolvedActors();
    for (let resolvedActor of this.conflictedActorsToPriorityOrderNumbersMap.keys()) {
      this.conflictResolvedActors.push(resolvedActor);
    }
    this.conflictedActorsToPriorityOrderNumbersMap.clear();
    this.modalService.dismissAll();
    this.resolveInitiativeConflicts(); //repeat to resolve next conflicted actors if present
  }

  onActorPriorityEntered(actor: Actor, priorityEvent: any): void {
    let priority: number = parseInt((<HTMLInputElement>priorityEvent.target).value);
    this.conflictedActorsToPriorityOrderNumbersMap.set(actor, priority);
  }

  getInitiativeConflictResolvedActors(): Actor[] {
    for (let [currentActor, currentActorOrder] of this.conflictedActorsToPriorityOrderNumbersMap) {
      for (let [nextActor, nextActorOrder] of this.conflictedActorsToPriorityOrderNumbersMap) {
        if (currentActor != nextActor) {
          // priority goes reverse way than initiative sorting - from lowest to highest instead of highest to lowest!
          if (nextActorOrder < currentActorOrder) {
            let currentActorIndex = this.actors.indexOf(currentActor);
            let nextActorIndex = this.actors.indexOf(nextActor);
            if (nextActorIndex > currentActorIndex) {
              this.actors[currentActorIndex] = nextActor;
              this.actors[nextActorIndex] = currentActor;
            }
          }
        }
      }
    }
    return this.actors;
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
