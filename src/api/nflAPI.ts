"use server";

import { NflWeeks } from "../constants";
import { getCurrentNflYear } from "../utils/getCurrentSportYear";
import { StandingsData } from "../types";
import {
  formatScoreboardData,
  formatScoreboardLeadersFootball,
} from "./utils/formatScoreboardData";
import { formatPlayerData } from "./utils/formatPlayerData";
import { formatTeamBannerData } from "./utils/formatTeamBannerData";
import {
  filterScheduleData,
  formatScheduleData,
} from "./utils/formatScheduleData";
import { formatTeamStats } from "./utils/formatTeamStats";
import { formatTeamLeadersData } from "./utils/formatTeamLeadersData";
import { getWeek } from "./utils/getWeek";

export const getNflScoreboardData = async (week: string) => {
  const numberWeek = Number(week);
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=${
      numberWeek > NflWeeks ? 3 : 2
    }&week=${numberWeek > NflWeeks ? numberWeek - NflWeeks : numberWeek}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  if (week === "22") { //pro bowl
    return [];
  }

  return formatScoreboardData(data, formatScoreboardLeadersFootball);
};

export const getNflPlayerPageData = async (playerID: string) => {
  const year = getCurrentNflYear();
  const playerDataResponse = await fetch(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${year}/athletes/${playerID}`,
    { cache: "no-cache" }
  );
  const playerData = await playerDataResponse.json();

  return await formatPlayerData(playerData);
};

export const getNflTeamBannerData = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatTeamBannerData(data);
};

const getNflTeamScheduleRegular = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}/schedule?seasontype=2`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

const getNflTeamSchedulePostSeason = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}/schedule?seasontype=3`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

export const getNflTeamSchedule = async (team: string) => {
  const [regularSeasonData, postSeasonData] = await Promise.all([
    getNflTeamScheduleRegular(team),
    getNflTeamSchedulePostSeason(team),
  ]);

  return filterScheduleData(regularSeasonData, postSeasonData);
};

export const getNflStandings = async () => {
  const reponse = await fetch(`https://cdn.espn.com/core/nfl/standings?xhr=1`, {
    cache: "no-cache",
  });

  let data;

  try {
    data = await reponse.json();
  } catch {
    return [];
  }

  const divisions = [
    ...data.content.standings.groups[0].groups,
    ...data.content.standings.groups[1].groups,
  ];

  return divisions.map((division) => {
    return {
      name: division.name,
      headers: ["Team", "W", "L", "T", "PCT"],
      standings: (division.standings.entries as any[]).map((entry) => {
        return {
          id: entry.team.id,
          data: [
            entry.team.location,
            entry.stats[0].displayValue,
            entry.stats[1].displayValue,
            entry.stats[2].displayValue,
            entry.stats[3].displayValue,
          ],
        };
      }),
    } as StandingsData;
  });
};

export const getNflTeamStats = async (team: string) => {
  const year = getCurrentNflYear();
  const reponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${year}/types/2/teams/${team}/statistics`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  const passingYards = data?.splits?.categories?.[1]?.stats?.[22];
  const rushingYards = data?.splits?.categories?.[2]?.stats?.[5];
  const pointsPerGame = data?.splits?.categories?.[9]?.stats?.[9];
  const sacks = data?.splits?.categories?.[4]?.stats?.[14];

  return formatTeamStats([passingYards, rushingYards, pointsPerGame, sacks]);
};

export const getNflTeamLeaderData = async (team: string) => {
  const year = getCurrentNflYear();
  const leaderSResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${year}/types/2/teams/${team}/leaders`,
    { cache: "no-cache" }
  );
  const data = await leaderSResponse.json();

  const passsingData = data?.categories?.[3];
  const rushingData = data?.categories?.[4];
  const receivingData = data?.categories?.[5];
  const tacklesData = data?.categories?.[6];
  const sacksData = data?.categories?.[7];
  const interceptionsData = data?.categories?.[8];

  return formatTeamLeadersData(
    [passsingData, rushingData, receivingData],
    [tacklesData, sacksData, interceptionsData]
  );
};

export const getNflWeek = async () => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return getWeek(data, NflWeeks);
};
