import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtagonistsEditorComponent } from './protagonists-editor.component';

describe('ProtagonistsEditorComponent', () => {
  let component: ProtagonistsEditorComponent;
  let fixture: ComponentFixture<ProtagonistsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtagonistsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtagonistsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
