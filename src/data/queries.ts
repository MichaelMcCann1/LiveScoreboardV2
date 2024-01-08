"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosHandler = (url: string) => {
  return axios.get(url).then((res) => {
    return res.data;
  });
};

interface TeamData {
  logo: string;
  location: string;
  name: string;
  record: string;
  score: string;
}

interface NflScoreboardData {
  id: string;
  date: string;
  awayTeamData: TeamData;
  homeTeamData: TeamData;
  status: string;
  clock: string;
  period: number;
  tv: string;
}

const formatNflScoreboardData = (data: any) => {
  const formatTeamData = (data: any): TeamData => {
    const teamData = data.team;
    return {
      logo: teamData.logo,
      location: teamData.location,
      name: teamData.name,
      record: data.records[0].summary,
      score: data.score,
    };
  };

  return (data.events as any[]).map((game: any) => {
    const competetion = game.competitions[0];

    return {
      id: competetion.id,
      date: competetion.date,
      awayTeamData: formatTeamData(competetion.competitors[1]),
      homeTeamData: formatTeamData(competetion.competitors[0]),
      status: game.status.type.description,
      clock: game.status.displayClock,
      period: game.status.period,
      tv: competetion?.broadcasts?.[0]?.names?.[0],
    } as NflScoreboardData;
  });
};

export const useNflScoreboard = () => {
  return useQuery({
    queryKey: ["nflScoreboard"],
    queryFn: async () => {
      return axiosHandler(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`
      );
    },
    select: (data) => formatNflScoreboardData(data),
  });
};
