import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBattleComponent: boolean = false;
  showCheatSheetComponent: boolean = false;
  showToolsComponent: boolean = true;

  onShowBattleComponent() {
    this.showBattleComponent = !this.showBattleComponent;
  }

  onShowCheatSheetComponent() {
    this.showCheatSheetComponent = !this.showCheatSheetComponent;
  }

  onShowToolsComponent() {
    this.showToolsComponent = !this.showToolsComponent;
  }

}
