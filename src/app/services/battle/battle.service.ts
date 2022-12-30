import { Injectable } from '@angular/core';
import {Actor} from "../../models/actors/actor";

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  actorsToInitiativeMap: Map<Actor, number> = new Map<Actor, number>();

  constructor() { }

  getActorsMap(): Map<Actor, number> {
    return this.actorsToInitiativeMap;
  }

  setActorsMap(initiativeMap: Map<Actor, number>): void {
    this.actorsToInitiativeMap = initiativeMap;
  }

}
