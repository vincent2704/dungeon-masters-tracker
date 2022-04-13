import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBattleComponent: boolean = false;
  showCheatSheetComponent: boolean = false;
  showToolsComponent: boolean = false;
  showSettingsComponent: boolean = false;

  onShowBattleComponent() {
    this.showBattleComponent = true;
    this.showCheatSheetComponent = false;
    this.showToolsComponent = false;
    this.showSettingsComponent = false;
  }

  onShowCheatSheetComponent() {
    this.showBattleComponent = false;
    this.showCheatSheetComponent = true;
    this.showToolsComponent = false;
    this.showSettingsComponent = false;
  }

  onShowToolsComponent() {
    this.showBattleComponent = false;
    this.showCheatSheetComponent = false;
    this.showToolsComponent = true;
    this.showSettingsComponent = false;
  }

  onShowSettingsComponent() {
    this.showBattleComponent = false;
    this.showCheatSheetComponent = false;
    this.showToolsComponent = false;
    this.showSettingsComponent = true;
  }
}
