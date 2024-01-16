import { times } from "lodash";

export const getNcaaWeeks = () => {
  const regularSeasonWeeks = times(15).map((week) => {
    return {
      week: week + 1,
      text: `Week ${week + 1}`,
    };
  });
  const playoffWeeks = [{ week: 16, text: "Bowls" }];
  return [...regularSeasonWeeks, ...playoffWeeks];
};
