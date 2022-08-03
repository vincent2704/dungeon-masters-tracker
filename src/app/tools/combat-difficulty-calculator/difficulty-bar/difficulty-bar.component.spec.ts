import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyBarComponent } from './difficulty-bar.component';

describe('DifficultyBarComponent', () => {
  let component: DifficultyBarComponent;
  let fixture: ComponentFixture<DifficultyBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
