import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-unconscious-damage',
  templateUrl: './unconscious-damage.component.html',
  styleUrls: ['./unconscious-damage.component.css']
})
export class UnconsciousDamageComponent implements OnInit {

  @Output()
  private deathSavingThrowFailureEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onHit() {
    this.deathSavingThrowFailureEmitter.emit(1);
  }

  onCriticalHit() {
    this.deathSavingThrowFailureEmitter.emit(2);
  }

}
