import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResurrectionComponent } from './resurrection.component';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";

describe('ResurrectionComponent', () => {
  let component: ResurrectionComponent;
  let fixture: ComponentFixture<ResurrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResurrectionComponent, NgbCollapse ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResurrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
