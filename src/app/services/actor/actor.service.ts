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

  fromJson(data: any): Actor {
    let id = data.id;
    let name = data.name;
    let maxHp = data.maxHp;
    let currentHp = data.currentHp;
    let level = data.level;
    let timeOfDeath = data.timeOfDeath;
    let resurrectionPenalty = data.resurrectionPenalty;

    let actor = new Actor(name, maxHp);
    actor.id = id;
    actor.currentHp = currentHp;
    actor.level = level;
    actor.setTimeOfDeath(timeOfDeath);
    actor.setResurrectionPenalty(resurrectionPenalty);

    return actor;
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

  setActors(actors: Actor[]): void {
    this.actors = actors;
    //TODO: backend call
  }

  updatePlayerCharacters(playerCharacters: Actor[]): Observable<Actor[]> {
    return this.httpClient.post<Actor[]>(this.playerCharactersUrl, playerCharacters, this.httpOptions);
  }

  deletePlayerCharacters(playerCharacters: Actor[]): Observable<unknown> {
    let charactersToDeleteIds = playerCharacters.map(character => character.id);
    let options = {
      params: this.httpOptions.params,
      body: charactersToDeleteIds
    }
    return this.httpClient.delete<Actor[]>(this.playerCharactersUrl, options);
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
