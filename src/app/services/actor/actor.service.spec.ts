import {TestBed} from '@angular/core/testing';

import {ActorService} from './actor.service';
import {Actor} from "../../models/actor";
import {PROTAGONISTS} from "../../models/dummy-backend-data/actorsData";

describe('actorService', () => {
  let actorService: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    actorService = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(actorService).toBeTruthy();
  });

  it("should reset battle actors to protagonists", () => {
    // given
    let someActors = [
      new Actor('Name 1', 1),
      new Actor('Name 2', 2),
      new Actor('Name 3', 3),
    ];
    actorService.setActors(someActors);
    expect(actorService.getActors()).toEqual(someActors);

    // when
    actorService.resetActors();
    expect(actorService.getActors()).toEqual(PROTAGONISTS)
  });

  it("should remove actor", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    actorService.setActors([actor1, actor2, actor3]);

    // when
    actorService.deleteActor(actor2);
    let expectedActors = [actor1, actor3];

    expect(actorService.getActors()).toEqual(expectedActors);
  });

  it("should remove multiple actors", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    actorService.setActors([actor1, actor2, actor3]);

    // when
    let notPresentActor = new Actor('Not present actor', 1);
    let actorsToDelete = [actor1, actor3, notPresentActor];
    actorService.deleteActors(actorsToDelete);

    expect(actorService.getActors()).toEqual([actor2]);
  });

});
