"use server";

import { formatScoreboardData } from "./utils/formatScoreboardData";

export const getNbaScoreboardData = async (date: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${date}`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return formatScoreboardData(data);
};

export const getNbaDay = async () => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`,
    { cache: "no-cache" }
  );
  const data = await reponse.json();

  return (data?.day?.date as string).replaceAll("-", "");
};
