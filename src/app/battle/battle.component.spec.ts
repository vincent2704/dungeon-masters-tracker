import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BattleComponent} from './battle.component';
import {PrepareBattleComponent} from "./prepare-battle/prepare-battle.component";
import {FormsModule} from "@angular/forms";

describe('BattleComponent', () => {
  let battleComponent: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BattleComponent, PrepareBattleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    battleComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(battleComponent).toBeTruthy();
  });
});
