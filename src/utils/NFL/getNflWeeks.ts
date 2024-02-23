import { NflWeeks } from "@/constants";
import { times } from "lodash";

export const getNflWeeks = () => {
  const regularSeasonWeeks = times(NflWeeks).map((week) => {
    return {
      week: week + 1,
      text: `Week ${week + 1}`,
    };
  });
  const playoffWeeks = [
    { week: 19, text: "Wild Card" },
    { week: 20, text: "Divisonal" },
    { week: 21, text: "Conf Champ" },
    { week: 23, text: "Super Bowl" },
  ];
  return [...regularSeasonWeeks, ...playoffWeeks];
};
