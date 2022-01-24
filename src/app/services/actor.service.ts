import { Injectable } from '@angular/core';
import { EXAMPLE_ACTORS } from "../models/actorsData";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor() { }

  getProtagonists() {
    return EXAMPLE_ACTORS;
  }

}
