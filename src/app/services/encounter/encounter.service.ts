import { Injectable } from '@angular/core';
import {Encounter} from "../../models/encounter";

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  private encounters: Encounter[] = [];

  constructor() {
    this.encounters = []
  }

  getEncounters(): Encounter[] {
    return this.encounters;
  }

  addEncounter(encounter: Encounter): void {
    this.encounters.push(encounter);
  }

}
