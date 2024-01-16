import { getCurrentNcaafYear } from "./getCurrentSportYear";
import { formatTeamData } from "./nflAPI";
import { NflPlayerData, NflScoreboardData } from "./types";

export const getNcaafScoreboardData = async (week: string) => {
  const numberWeek = Number(week);
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?seasontype=${
      numberWeek > 15 ? 3 : 2
    }&week=${numberWeek > 15 ? numberWeek - 15 : numberWeek}`,
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

  return season === 3 ? week + 15 : week;
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
    abbreviation: teamData.abbreviation,
  } as NflPlayerData;
};
