import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareBattleComponent } from './prepare-battle.component';
import {FormsModule} from "@angular/forms";

describe('PrepareBattleComponent', () => {
  let component: PrepareBattleComponent;
  let fixture: ComponentFixture<PrepareBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PrepareBattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
