import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BattleComponent} from './battle.component';
import {PrepareBattleComponent} from "./prepare-battle/prepare-battle.component";
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "./add-actor/add-actor.component";
import {Actor} from "../models/actor";

describe('BattleComponent', () => {
  let battleComponent: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BattleComponent, PrepareBattleComponent, AddActorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    battleComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(battleComponent).toBeTruthy();
  });

  it("should successfully build initiative to actor's map", () => {
    //given
    let actor1 = new Actor('Actor 1', 10, 10, 1);
    let actor2 = new Actor('Actor 2', 10, 10, 1);
    let actor3 = new Actor('Actor 3', 10, 10, 2);
    let actor4 = new Actor('Actor 4', 10, 10, 2);
    let actor5 = new Actor('Actor 5', 10, 10, 3);

    let expectedMap = (new Map<number, Actor[]>());
    expectedMap.set(1, [actor1, actor2]);
    expectedMap.set(2, [actor3, actor4]);
    expectedMap.set(3, [actor5]);

    battleComponent.actors = [actor1, actor2, actor3, actor4, actor5];
    //when
    let map = battleComponent.getInitiativeConflictedActors();
    //then
    expect(map).toEqual(expectedMap);
  });

});
