import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActorComponent } from './add-actor.component';
import {FormsModule} from "@angular/forms";

describe('AddActorComponent', () => {
  let component: AddActorComponent;
  let fixture: ComponentFixture<AddActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActorComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
