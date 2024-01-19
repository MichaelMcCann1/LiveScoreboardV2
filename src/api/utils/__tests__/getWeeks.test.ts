import { getWeek } from "../getWeek";

const mockRegularSeasonData = {
  season: {
    type: 2,
  },
  week: {
    number: 6,
  },
};

const mockPostSeasonData = {
  season: {
    type: 3,
  },
  week: {
    number: 2,
  },
};

const mockLeagueWeeks = 10;

describe("getWeek", () => {
  it("does not update the current week if in the regular season", () => {
    expect(getWeek(mockRegularSeasonData, mockLeagueWeeks)).toBe(6);
  });

  it("updates the current week if in the post season", () => {
    expect(getWeek(mockPostSeasonData, mockLeagueWeeks)).toBe(12);
  });
});
