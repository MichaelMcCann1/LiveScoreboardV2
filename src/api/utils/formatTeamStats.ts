import { TeamStat } from "@/types";

export const formatTeamStats = (stats: any[]) => {
  return stats
    ?.map((stat) => {
      return {
        stat: stat?.displayName,
        value: stat?.displayValue,
        rank: stat?.rank,
      } as TeamStat;
    })
    .filter((stat) => stat.value);
};
