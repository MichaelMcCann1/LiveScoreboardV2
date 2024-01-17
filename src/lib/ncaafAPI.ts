import { isEmpty } from "lodash";
import { NcaafWeeks } from "./constants";
import { getCurrentNcaafYear } from "./getCurrentSportYear";
import { formatScheduleData, formatTeamData } from "./nflAPI";
import {
  Categories,
  NflPlayerData,
  NflScoreboardData,
  NflStandingsData,
  NflTeamBannerData,
  NflTeamLeaderAthleteData,
  NflTeamLeaderData,
  NflTeamStandingsData,
  ScheduleData,
  TeamStat,
  StandingsData,
} from "./types";

export const getNcaafScoreboardData = async (week: string) => {
  const numberWeek = Number(week);
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?seasontype=${
      numberWeek > NcaafWeeks ? 3 : 2
    }&week=${numberWeek > NcaafWeeks ? numberWeek - NcaafWeeks : numberWeek}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return (data.events as any[])
    .map((game: any) => {
      const competetion = game.competitions[0];

      return {
        id: competetion?.id,
        date: competetion?.date,
        awayTeamData: formatTeamData(competetion?.competitors?.[1]),
        homeTeamData: formatTeamData(competetion?.competitors?.[0]),
        status: game?.status?.type?.description,
        clock: game?.status?.displayClock,
        period: game?.status?.period,
        tv: competetion?.broadcasts?.[0]?.names?.[0],
        spread: competetion?.odds?.[0]?.details,
        overUnder: competetion?.odds?.[0]?.overUnder,
        leaders: (competetion?.leaders as any[])?.map((leader) => {
          return {
            shortDisplayName: leader?.shortDisplayName,
            displayValue: leader?.leaders?.[0]?.displayValue,
            shortName: leader?.leaders?.[0]?.athlete?.shortName,
            position: leader?.leaders?.[0]?.athlete?.position?.abbreviation,
            headshot: leader?.leaders?.[0]?.athlete?.headshot,
            id: leader?.leaders?.[0]?.athlete?.id,
          };
        }),
      } as NflScoreboardData;
    })
    .filter(
      (game) =>
        game.awayTeamData.name !== "TBD" && game.homeTeamData.name !== "TBD"
    );
};

export const getNcaafWeek = async () => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();
  const season = data?.season?.type as number;
  const week = data?.week?.number as number;

  return season === 3 ? week + NcaafWeeks : week;
};

export const getNcaafPlayerPageData = async (playerID: string) => {
  const year = getCurrentNcaafYear();
  const playerDataResponse = await fetch(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${year}/athletes/${playerID}`,
    { cache: "no-cache" }
  );
  const playerData = await playerDataResponse.json();
  const teamDataResponse = await fetch(playerData?.team?.$ref);
  const teamData = await teamDataResponse.json();

  return {
    firstName: playerData.firstName,
    lastName: playerData.lastName,
    jersey: playerData.jersey,
    position: playerData.position.displayName,
    height: playerData.displayHeight,
    weight: playerData.displayWeight,
    draft: playerData?.draft?.displayText,
    headshot: playerData.headshot.href,
    teamLink: playerData.team.$ref,
    age: playerData.age,
    city: playerData.birthPlace.city,
    state: playerData.birthPlace.state,
    location: teamData.location,
    nickname: teamData.name,
    logo: teamData.logos[0].href,
    abbreviation: teamData.id,
  } as NflPlayerData;
};

export const getNcaafTeamBannerData = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  const teamData = data.team;
  return {
    location: teamData.location,
    nickname: teamData.name,
    standingSummary: teamData.standingSummary,
    logo: teamData.logos[0].href,
    record: teamData.record.items[0].summary,
  } as NflTeamBannerData;
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

  const data = [{ title: "Regular Season", scheduleData: regularSeasonData }];
  if (!isEmpty(postSeasonData)) {
    data.unshift({ title: "PostSeason", scheduleData: postSeasonData });
  }

  return data as ScheduleData[];
};

export const getNcaafStandings = async () => {
  const reponse = await fetch(
    `https://cdn.espn.com/core/college-football/standings?xhr=1`,
    {
      cache: "no-cache",
    }
  );
  const data = await reponse.json();

  const conferences = [...data.content.standings.groups];

  return conferences.map((division) => {
    return {
      name: division?.name,
      headers: ["Team", "Conf Rec", "Overall Rec"],
      standings: (division?.standings?.entries as any[])?.map((entry) => {
        return {
          abbreviation: entry?.team?.id,
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

  return [passingYards, rushingYards, pointsPerGame, sacks]?.map((stat) => {
    return {
      stat: stat?.displayName,
      value: stat?.displayValue,
      rank: stat?.rank,
    } as TeamStat;
  });
};

export const getNcaafTeamLeaderData = async (team: string) => {
  const year = getCurrentNcaafYear();
  const leaderSResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${year}/types/2/teams/${team}/leaders`,
    { cache: "no-cache" }
  );
  const data = await leaderSResponse.json();

  const formatData = (data: any, category: Categories) => {
    return {
      displayName: data?.displayName,
      value: data?.leaders?.[0]?.value,
      athlete: data?.leaders?.[0]?.athlete?.$ref,
      category,
    };
  };

  const passsingData = data?.categories?.[3];
  const rushingData = data?.categories?.[4];
  const receivingData = data?.categories?.[5];
  const tacklesData = data?.categories?.[6];
  const sacksData = data?.categories?.[7];
  const interceptionsData = data?.categories?.[8];

  const offenseData = [passsingData, rushingData, receivingData].map((data) =>
    formatData(data, "Offense")
  );
  const defenseData = [tacklesData, sacksData, interceptionsData].map((data) =>
    formatData(data, "Defense")
  );

  const orderedLeaders = [...offenseData, ...defenseData].filter(
    (leader) => leader.athlete
  );
  return (await Promise.all(
    orderedLeaders.map(async (leader) => {
      const athleteReponse = await fetch(leader?.athlete);
      const athleteData = await athleteReponse.json();

      return {
        ...leader,
        athlete: {
          fullName: athleteData.fullName,
          headshot: athleteData.headshot.href,
          position: athleteData.position.abbreviation,
          jersey: athleteData.jersey,
          id: athleteData.id,
        } as NflTeamLeaderAthleteData,
      };
    })
  )) as NflTeamLeaderData[];
};
