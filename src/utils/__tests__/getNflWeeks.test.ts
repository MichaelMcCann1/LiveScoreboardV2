import { getNflWeeks } from "../NFL/getNflWeeks";

describe("getNflWeeks", () => {
  it("has a length of 22", () => {
    expect(getNflWeeks().length).toBe(22);
  });

  it("has a value of 1 for its first element, not 0", () => {
    expect(getNflWeeks()[0]).toEqual({ week: 1, text: "Week 1" });
  });
});
