import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortRestComponent } from './short-rest.component';

describe('ShortRestComponent', () => {
  let component: ShortRestComponent;
  let fixture: ComponentFixture<ShortRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
