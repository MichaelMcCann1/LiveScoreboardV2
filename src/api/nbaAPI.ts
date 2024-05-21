"use server";

import { getCurrentNbafYear } from "@/utils/getCurrentSportYear";
import {
  formatScoreboardData,
  formatScoreboardLeadersBasketball,
} from "./utils/formatScoreboardData";
import { formatPlayerData } from "./utils/formatPlayerData";
import { formatTeamBannerData } from "./utils/formatTeamBannerData";
import {
  filterScheduleData,
  formatScheduleData,
} from "./utils/formatScheduleData";
import { formatTeamLeadersData } from "./utils/formatTeamLeadersData";
import { formatTeamStats } from "./utils/formatTeamStats";
import { StandingsData } from "@/types";

export const getNbaScoreboardData = async (date: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${date}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return formatScoreboardData(data, formatScoreboardLeadersBasketball);
};

export const getNbaPlayerPageData = async (playerID: string) => {
  const year = getCurrentNbafYear();
  const playerDataResponse = await fetch(
    `http://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/${year}/athletes/${playerID}`,
    { cache: "no-cache" }
  );
  const playerData = await playerDataResponse.json();

  return await formatPlayerData(playerData);
};

export const getNbaTeamBannerData = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatTeamBannerData(data);
};

const getNbaTeamScheduleRegular = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team}/schedule?seasontype=2`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

const getNbaTeamSchedulePostSeason = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team}/schedule?seasontype=3`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

export const getNbaTeamSchedule = async (team: string) => {
  const [regularSeasonData, postSeasonData] = await Promise.all([
    getNbaTeamScheduleRegular(team),
    getNbaTeamSchedulePostSeason(team),
  ]);

  return filterScheduleData(regularSeasonData, postSeasonData);
};

export const getNbaTeamLeaderData = async (team: string) => {
  const year = getCurrentNbafYear();
  const leaderSResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/${year}/types/2/teams/${team}/leaders`,
    { cache: "no-cache" }
  );
  const data = await leaderSResponse.json();

  const pointsData = data?.categories?.[0];
  const assistsData = data?.categories?.[1];
  const fieldGoalData = data?.categories?.[7];
  const stealsData = data?.categories?.[5];
  const blocks = data?.categories?.[6];
  const defReboundsData = data?.categories?.[3];

  return formatTeamLeadersData(
    [pointsData, assistsData, fieldGoalData],
    [stealsData, blocks, defReboundsData]
  );
};

export const getNbaTeamStats = async (team: string) => {
  const year = getCurrentNbafYear();
  const reponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/${year}/types/2/teams/${team}/statistics`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  const points = data?.splits?.categories?.[2]?.stats?.[5];
  const threePointers = data?.splits?.categories?.[2]?.stats?.[13];
  const blocks = data?.splits?.categories?.[0]?.stats?.[1];
  const sacks = data?.splits?.categories?.[0]?.stats?.[2];

  return formatTeamStats([points, threePointers, blocks, sacks]);
};

export const getNbaStandings = async () => {
  const reponse = await fetch(`https://cdn.espn.com/core/nba/standings?xhr=1`, {
    cache: "no-cache",
  });

  let data;

  try {
    data = await reponse.json();
  } catch {
    return [];
  }

  const divisions = [...data.content.standings.groups];

  return divisions.map((division) => {
    return {
      name: division.name,
      headers: ["Team", "W", "L", "PCT"],
      standings: (division.standings.entries as any[]).map((entry) => {
        return {
          id: entry.team.id,
          data: [
            entry.team.location,
            entry.stats[0].displayValue,
            entry.stats[1].displayValue,
            entry.stats[2].displayValue,
          ],
        };
      }),
    } as StandingsData;
  });
};

export const getNbaDay = async () => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return (data?.day?.date as string).replaceAll("-", "");
};
