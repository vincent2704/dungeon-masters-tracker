import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestingComponent } from './resting.component';
import {ShortRestComponent} from "./short-rest/short-rest.component";
import {FormsModule} from "@angular/forms";

describe('RestingComponent', () => {
  let component: RestingComponent;
  let fixture: ComponentFixture<RestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ RestingComponent, ShortRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
