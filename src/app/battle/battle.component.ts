import {Component, OnInit, ViewChild} from '@angular/core';
import {Actor} from "../models/actor";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {BattleService} from "../services/battle/battle.service";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  isBattleStarted: boolean = false;
  actors: Actor[] = [];
  actorsToInitiativeMap: Map<Actor, number> = new Map<Actor, number>();

  @ViewChild('initiativeConflictModal')
  conflictModal!: any;

  conflictedActors: Actor[] = [];
  conflictedActorsToPriorityOrderNumbersMap: Map<Actor, number> = new Map<Actor, number>();
  conflictResolvedActors: Actor[] = [];

  constructor(
    private modalService: NgbModal,
    private modalConfig: NgbModalConfig,
    private battleService: BattleService
  ) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit(): void {
  }

  startBattle(): void {
    this.actorsToInitiativeMap = this.battleService.actorsToInitiativeMap;
    this.actors = Array.from(this.sortActorsByInitiative())
      .map(entry => entry[0]);
    // this.actors = this.sortActorsByInitiative();
    this.resolveInitiativeConflicts();
    this.isBattleStarted = true;
  }

  endBattle(): void {
    this.isBattleStarted = false;
    this.conflictResolvedActors = [];
  }

  // sortActorsByInitiative(): Actor[] {
  //   this.actors.sort(
  //     ((actor1, actor2) => actor2.getInitiative() - actor1.getInitiative()));
  //   return this.actors;
  // }

  sortActorsByInitiative(): Map<Actor, number> {
    return new Map<Actor, number>(
      Array.from(this.actorsToInitiativeMap)
        .sort((entry1, entry2) => {
          return entry1[1] - entry2[1];
        })
    )
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
    this.actors = this.getInitiativeConflictResolvedActors(); //
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

    // let occurredInitiatives: number[] = [];
    // let duplicateInitiatives: number[] = [];
    //
    // let actorsToInitiativeEntryArray = Array.from(this.actorsToInitiativeMap);
    // actorsToInitiativeEntryArray
    //   .forEach(entry => {
    //     if (occurredInitiatives.find(occurred => occurred == entry[1])) {
    //       duplicateInitiatives.push(entry[1]);
    //     } else {
    //       if (!duplicateInitiatives.find(duplicate => duplicate == entry[1]))
    //         occurredInitiatives.push(entry[1]);
    //     }
    //   });
    //
    // for(const duplicate of duplicateInitiatives) {
    //   initiativeToActorsMap.set(duplicate, []);
    // }
    //
    // for (const entry of actorsToInitiativeEntryArray) {
    //   for (const duplicate of duplicateInitiatives) {
    //     if(entry[1] == duplicate) {
    //       initiativeToActorsMap.set()
    //     }
    //   }
    // }

    let actorsToInitiativeEntryArray = Array.from(this.actorsToInitiativeMap);

    actorsToInitiativeEntryArray.map(entry => {
      let initiative = entry[1];
      let isInitiativePresentInMap = initiativeToActorsMap.get(initiative);
      if (!isInitiativePresentInMap) {
        initiativeToActorsMap.set(initiative, [entry[0]]);
      } else {
        initiativeToActorsMap.get(initiative)!.push(entry[0]);
      }
    })

  //   this.actors.map(actor => {
  //     let key = actor.getInitiative();
  //     let isInitiativePresentInMap = initiativeToActorsMap.get(key);
  //     if (!isInitiativePresentInMap) {
  //       initiativeToActorsMap.set(key, [actor]);
  //     } else {
  //       initiativeToActorsMap.get(key)!.push(actor);
  //     }
  //   });
    return initiativeToActorsMap;
  }

}
