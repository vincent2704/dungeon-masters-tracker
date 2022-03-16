import {TemporaryHP} from "./temporaryHP";

describe('TemporaryHP', () => {

  it("has temporary hit points", () => {
    expect(
      new TemporaryHP(0, 0).hasTemporaryHitPoints())
      .toBeFalse();

    expect(
      new TemporaryHP(3).hasTemporaryHitPoints())
      .toBeTrue();
  });

  it("should subtract temporary hit points", () => {
    //given
    let temporaryHP = new TemporaryHP(10);
    //when
    temporaryHP.subtractTemporaryHitPoints(5);
    //then
    expect(temporaryHP.getHitPoints()).toEqual(5);
  });

  it("when damage received, temporary hit points should not go below 0", () => {
    //given
    let temporaryHP = new TemporaryHP(10);
    //when
    temporaryHP.subtractTemporaryHitPoints(11);
    //then
    expect(temporaryHP.getHitPoints()).toEqual(0);
  });

});
