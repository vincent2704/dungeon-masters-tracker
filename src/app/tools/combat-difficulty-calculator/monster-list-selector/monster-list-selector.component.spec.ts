import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListSelectorComponent } from './monster-list-selector.component';
import {MonsterService} from "../../../services/monster/monster.service";

describe('MonsterListSelectorComponent', () => {
  let component: MonsterListSelectorComponent;
  let fixture: ComponentFixture<MonsterListSelectorComponent>;
  let monsterServiceSpy: jasmine.SpyObj<MonsterService>

  beforeEach(async () => {
    const monsterService = jasmine.createSpyObj('MonsterService', ['getMonsters'])

    await TestBed.configureTestingModule({
      declarations: [ MonsterListSelectorComponent ],
      providers: [
        {provide: MonsterService, useValue: monsterService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterListSelectorComponent);
    component = fixture.componentInstance;
    component.participatingActors = [];

    monsterServiceSpy = TestBed.inject(MonsterService) as jasmine.SpyObj<MonsterService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
