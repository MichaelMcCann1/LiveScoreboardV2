import { getNcaaWeeks } from "../NCAAF/getNcaafWeeks";

describe("getNcaafWeeks", () => {
  it("has a length of 16", () => {
    expect(getNcaaWeeks().length).toBe(16);
  });

  it("has a value of 1 for its first element, not 0", () => {
    expect(getNcaaWeeks()[0]).toEqual({ week: 1, text: "Week 1" });
  });
});
