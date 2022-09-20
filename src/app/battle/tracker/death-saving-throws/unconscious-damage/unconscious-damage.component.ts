import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HitType} from "../../../../models/combat-data/HitType";

@Component({
  selector: 'app-unconscious-damage',
  templateUrl: './unconscious-damage.component.html',
  styleUrls: ['./unconscious-damage.component.css']
})
export class UnconsciousDamageComponent implements OnInit {

  @Output()
  private hitTypeEventEmitter = new EventEmitter<HitType>();

  constructor() { }

  ngOnInit(): void {
  }

  onHit() {
    this.hitTypeEventEmitter.emit(HitType.NORMAL_HIT);
  }

  onCriticalHit() {
    this.hitTypeEventEmitter.emit(HitType.CRITICAL_HIT);
  }

}
