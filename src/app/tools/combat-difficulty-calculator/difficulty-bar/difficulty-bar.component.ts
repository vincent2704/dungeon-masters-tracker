import {Component, Input, OnInit} from '@angular/core';
import {Difficulty} from "../../../models/combat-data/Difficulty";

@Component({
  selector: 'app-difficulty-bar',
  templateUrl: './difficulty-bar.component.html',
  styleUrls: ['./difficulty-bar.component.css']
})
export class DifficultyBarComponent implements OnInit {

  @Input()
  difficulty!: Difficulty;

  constructor() { }

  ngOnInit(): void {
  }

  getDifficultyBarClass(): string {
    switch (this.difficulty) {
      case Difficulty.EASY: {
        return 'progress-bar progress-bar-striped bg-info';
      }
      case Difficulty.MEDIUM: {
        return 'progress-bar progress-bar-striped bg-success';
      }
      case Difficulty.HARD: {
        return 'progress-bar progress-bar-striped bg-warning';
      }
      case Difficulty.DEADLY: {
        return 'progress-bar progress-bar-striped bg-danger';
      }
      default: {
        return 'progress-bar progress-bar-striped bg-dark';
      }
    }
  }

  getDifficultyBarWidth(): string {
    switch (this.difficulty) {
      case Difficulty.EASY: {
        return '25%';
      }
      case Difficulty.MEDIUM: {
        return '50%';
      }
      case Difficulty.HARD: {
        return '75%';
      }
      case Difficulty.DEADLY: {
        return '100%';
      }
      default: {
        return '100%';
      }
    }
  }

}
