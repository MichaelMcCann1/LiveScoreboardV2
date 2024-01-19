import { getNflWeeks } from "../NFL/getNflWeeks";

describe("getNflWeeks", () => {
  it("has a length of 23", () => {
    expect(getNflWeeks().length).toBe(23);
  });

  it("has a value of 1 for its first element, not 0", () => {
    expect(getNflWeeks()[0]).toEqual({ week: 1, text: "Week 1" });
  });
});
