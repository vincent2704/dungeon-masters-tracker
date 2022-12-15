import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProtagonistsEditorComponent} from './protagonists-editor.component';
import {Actor} from "../../../models/actors/actor";
import {ActorService} from "../../../services/actor/actor.service";
import {FormsModule} from "@angular/forms";
import {Observable, of} from "rxjs";
import {PlayerCharacter} from "../../../models/actors/playerCharacter";

describe('ProtagonistsEditorComponent', () => {
  let component: ProtagonistsEditorComponent;
  let fixture: ComponentFixture<ProtagonistsEditorComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getPlayerCharacters2', 'deletePlayerCharacters', 'updatePlayerCharacters']);

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ProtagonistsEditorComponent ],
      providers: [
        { provide: ActorService, useValue: actorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    actorServiceSpy.getPlayerCharacters2.and.returnValue(of([]));
    fixture = TestBed.createComponent(ProtagonistsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add actor to list of actors to delete', () => {
    //given
    let actorToDelete: PlayerCharacter = {
      name: 'Name',
      maxHp: 10,
      level: 1
    }
      // let actorToDelete = new Actor('Actor', 10)
    //when
    component.onSetActorToDelete(actorToDelete);
    //then
    expect(component.actorsToDelete).toEqual([actorToDelete]);
  });

  it('should change actors if changes are submitted', () => {
    //given
    let actor1: PlayerCharacter = {
      name: 'Actor',
      maxHp: 10,
      level: 1
    }
    let actor2: PlayerCharacter = {
      name: 'Actor 2',
      maxHp: 15,
      level: 1
    }
    let actor3: PlayerCharacter = {
      name: 'Actor 3',
      maxHp: 14,
      level: 1
    }
    fixture = TestBed.createComponent(ProtagonistsEditorComponent);
    component = fixture.componentInstance;

    // component gets player characters from parent component during initialization
    component.playerCharacters = [actor1, actor2, actor3];
    fixture.detectChanges();


    component.onSetActorToDelete(actor3)
    actorServiceSpy.deletePlayerCharacters.withArgs([actor3])
      .and.returnValue(new Observable<unknown>());

    component.actorToAdd = {
      name: 'New Actor',
      level: '1',
      maxHp: '10'
    }
    component.addActor();

    actorServiceSpy.updatePlayerCharacters.withArgs(component.playerCharacters)
      .and.returnValue(of(component.playerCharacters))
    component.onSubmitProtagonists()

    // then
    expect(actorServiceSpy.updatePlayerCharacters).toHaveBeenCalledOnceWith([
      actor1, actor2, {
        name: 'New Actor',
        maxHp: 10,
        currentHp: 10,
        level: 1
      } as PlayerCharacter
    ])
  });

  it('should not change actors if changes are cancelled', () => {
    //given
    let actor1: PlayerCharacter = {
      name: 'Actor',
      maxHp: 10,
      level: 1
    }
    let actor2: PlayerCharacter = {
      name: 'Actor 2',
      maxHp: 15,
      level: 1
    }
    let actor3: PlayerCharacter = {
      name: 'Actor 3',
      maxHp: 14,
      level: 1
    }

    fixture = TestBed.createComponent(ProtagonistsEditorComponent);
    component = fixture.componentInstance;
    component.playerCharacters = [actor1, actor2, actor3]
    fixture.detectChanges();

    //when
    component.playerCharacters[0].level = 12;
    component.onSetActorToDelete(actor2);

    component.actorToAdd = {
      name: 'New Actor',
      level: '1',
      maxHp: '10'
    }
    component.addActor();

    //and
    component.onCancelEdit();

    //then
    expect(actorServiceSpy.updatePlayerCharacters).toHaveBeenCalledTimes(0);
    expect(actorServiceSpy.deletePlayerCharacters).toHaveBeenCalledTimes(0);
    expect(component.playerCharacters).toEqual([actor1, actor2, actor3]);
  });

});
