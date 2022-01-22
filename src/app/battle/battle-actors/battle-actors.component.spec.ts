import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleActorsComponent } from './battle-actors.component';

describe('BattleActorsComponent', () => {
  let component: BattleActorsComponent;
  let fixture: ComponentFixture<BattleActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleActorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
