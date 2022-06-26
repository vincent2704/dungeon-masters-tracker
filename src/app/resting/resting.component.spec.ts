import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestingComponent } from './resting.component';
import {ShortRestComponent} from "./short-rest/short-rest.component";
import {FormsModule} from "@angular/forms";
import {LongRestComponent} from "./long-rest/long-rest.component";

describe('RestingComponent', () => {
  let component: RestingComponent;
  let fixture: ComponentFixture<RestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ RestingComponent, ShortRestComponent, LongRestComponent ]
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
