import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBattleComponent: boolean = true;
  showCheatSheetComponent: boolean = false;

  onShowBattleComponent() {
    this.showBattleComponent = !this.showBattleComponent;
  }

  onShowCheatSheetComponent() {
    this.showCheatSheetComponent = !this.showCheatSheetComponent;
  }

}
