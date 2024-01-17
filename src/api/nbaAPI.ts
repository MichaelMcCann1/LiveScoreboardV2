"use server";

import { getCurrentNbafYear } from "@/lib/getCurrentSportYear";
import { formatScoreboardData } from "./utils/formatScoreboardData";
import { formatPlayerData } from "./utils/formatPlayerData";

export const getNbaScoreboardData = async (date: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${date}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return formatScoreboardData(data);
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

export const getNbaDay = async () => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return (data?.day?.date as string).replaceAll("-", "");
};
