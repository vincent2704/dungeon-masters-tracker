import {Injectable} from '@angular/core';
import {Encounter} from "../../models/encounter";

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  private encounters: Encounter[] = [];

  constructor() {}

  getEncounters(): Encounter[] {
    return this.encounters;
  }

  addEncounter(encounter: Encounter): void {
    if (this.getEncounterNames().includes(encounter.getName())) {
      return;
    }
      this.encounters.push(encounter);
  }

  private getEncounterNames(): string[] {
    return this.encounters.map(encounterToMap => {
      return encounterToMap.getName()
    });
  }

}
