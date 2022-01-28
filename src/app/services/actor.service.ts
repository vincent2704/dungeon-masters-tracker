import {Injectable} from '@angular/core';
import {PROTAGONISTS} from "../models/actorsData";
import {Actor} from "../models/actor";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor() {
  }

  getProtagonists(): Actor[] {
    return PROTAGONISTS;
  }

}
