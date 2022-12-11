import {Injectable} from '@angular/core';
import {Actor} from "../../models/actor";
import {Condition} from "../../models/Condition";
import {BattleCondition} from "../../models/battleCondition";
import {PROTAGONISTS} from "../../models/dummy-backend-data/actorsData";
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Environment} from "../../environment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private actors: Actor[] = PROTAGONISTS;

  private readonly playerCharactersUrl: string = `${Environment.HOST_ADDRESS}/v1/player-characters`
  private readonly httpOptions = {
    params: new HttpParams().append("campaignId", Environment.CAMPAIGN_ID)
  }

  constructor(private httpClient: HttpClient) {
  }

  getActors(): Actor[] {
    return this.actors.map(actor => {
      return actor.copy();
    });
  }

  // temporary method for partial backend implementation, it's going to fully replace `getActors()`
  getPlayerCharacters(): Observable<Actor[]> {
    if(environment.environmentName == Environment.GHPAGES) {
      return of(PROTAGONISTS);
    }
    return this.httpClient.get<Actor[]>(this.playerCharactersUrl, this.httpOptions);
  }

  findActorByName(actorName: string): Actor {
    return this.actors.find(actor => actor.name == actorName)!;
  }

  addActor(actor: Actor): void {
    this.actors.push(actor);
  }

  deleteActor(actor: Actor): void {
    this.actors.splice(this.actors.indexOf(actor), 1);
  }

  deleteActors(actorsToDelete: Actor[]): void {
    for (let actor of actorsToDelete) {
      if (this.actors.indexOf(actor) > -1) {
        this.actors.splice(this.actors.indexOf(actor), 1);
      }
    }
  }

  setActors(Actors: Actor[]): void {
    this.actors = Actors;
    //TODO: backend call
  }

  updateActors(actors: Actor[]): void {
    for (let actor of actors) {
      for (let i = 0; i < this.actors.length; i++) {
        if (actor.name == this.actors[i].name) {
          this.actors[i] = actor;
        }
      }
    }
  }

  addBattleCondition(actor: Actor, condition: BattleCondition): void {
    actor.battleConditions.push(condition);
  }

  removeCondition(actor: Actor, conditionToRemove: Condition): void {
    if (actor.battleConditions.find(battleCondition => battleCondition.getCondition() === conditionToRemove)) {
      actor.removeCondition(conditionToRemove);
    }
  }

}
