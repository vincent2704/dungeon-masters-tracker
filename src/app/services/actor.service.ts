import {Injectable} from '@angular/core';
import {PROTAGONISTS} from "../models/actorsData";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor() {
  }

  getProtagonists() {
    return PROTAGONISTS;
  }

}
