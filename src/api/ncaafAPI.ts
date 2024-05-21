"use server";

import { NcaafWeeks } from "../constants";
import { getCurrentNcaafYear } from "../utils/getCurrentSportYear";
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

export const getNcaafScoreboardData = async (week: string) => {
  const numberWeek = Number(week);
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?seasontype=${
      numberWeek > NcaafWeeks ? 3 : 2
    }&week=${numberWeek > NcaafWeeks ? numberWeek - NcaafWeeks : numberWeek}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return formatScoreboardData(data, formatScoreboardLeadersFootball);
};

export const getNcaafWeek = async () => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return getWeek(data, NcaafWeeks);
};

export const getNcaafPlayerPageData = async (playerID: string) => {
  const year = getCurrentNcaafYear();
  const playerDataResponse = await fetch(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${year}/athletes/${playerID}`,
    { cache: "no-cache" }
  );
  const playerData = await playerDataResponse.json();

  return await formatPlayerData(playerData);
};

export const getNcaafTeamBannerData = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatTeamBannerData(data);
};

const getNcaafTeamScheduleRegular = async (team: string) => {
  const year = getCurrentNcaafYear();
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team}/schedule?season=${year}&seasontype=2`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

const getNcaafTeamSchedulePostSeason = async (team: string) => {
  const year = getCurrentNcaafYear();
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team}/schedule?season=${year}&seasontype=3`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

export const getNcaafTeamSchedule = async (team: string) => {
  const [regularSeasonData, postSeasonData] = await Promise.all([
    getNcaafTeamScheduleRegular(team),
    getNcaafTeamSchedulePostSeason(team),
  ]);

  return filterScheduleData(regularSeasonData, postSeasonData);
};

export const getNcaafStandings = async () => {
  const reponse = await fetch(
    `https://cdn.espn.com/core/college-football/standings?xhr=1`,
    {
      cache: "no-cache",
    }
  );

  let data;

  try {
    data = await reponse.json();
  } catch {
    return [];
  }

  const conferences = [...data.content.standings.groups];

  return conferences.map((division) => {
    return {
      name: division?.name,
      headers: ["Team", "Conf Rec", "Overall Rec"],
      standings: (division?.standings?.entries as any[])?.map((entry) => {
        return {
          id: entry?.team?.id,
          data: [
            entry?.team?.location,
            entry?.stats?.[0]?.displayValue,
            entry?.stats?.[3]?.displayValue,
          ],
        };
      }),
    } as StandingsData;
  });
};

export const getNcaafTeamStats = async (team: string) => {
  const year = getCurrentNcaafYear();
  const reponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${year}/types/2/teams/${team}/statistics`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  const passingYards = data?.splits?.categories?.[1]?.stats?.[22];
  const rushingYards = data?.splits?.categories?.[2]?.stats?.[13];
  const pointsPerGame = data?.splits?.categories?.[9]?.stats?.[9];
  const sacks = data?.splits?.categories?.[4]?.stats?.[14];

  return formatTeamStats([passingYards, rushingYards, pointsPerGame, sacks]);
};

export const getNcaafTeamLeaderData = async (team: string) => {
  const year = getCurrentNcaafYear();
  const leaderSResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${year}/types/2/teams/${team}/leaders`,
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
