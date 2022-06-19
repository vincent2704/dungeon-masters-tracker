import { Injectable } from '@angular/core';
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {Actor} from "../../models/actor";

@Injectable({
  providedIn: 'root'
})
export class RestingService {

  constructor() { }

  performShortRest(shortRestDuration: number, actorsToShortRestInput: Map<Actor, ShortRestInput>) {

  }
}
