import { Injectable } from '@angular/core';
import {Npc} from "../../models/npc";
import {NPCs} from "../../models/dummy-backend-data/npcData";

@Injectable({
  providedIn: 'root'
})
export class NpcService {

  constructor() { }

  getNpcs(): Npc[] {
    return NPCs;
  }
}
