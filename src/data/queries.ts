"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosHandler = (url: string) => {
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export interface TeamData {
  logo: string;
  location: string;
  name: string;
  record: string;
  score: string;
  linescores: number[];
  winner: boolean;
}

export interface LeaderData {
  shortDisplayName: string;
  displayValue: string;
  shortName: string;
  position: string;
  headshot: string;
}

export interface NflScoreboardData {
  id: string;
  date: string;
  awayTeamData: TeamData;
  homeTeamData: TeamData;
  status: string;
  clock: string;
  period: number;
  tv: string;
  leaders: LeaderData[];
}

const formatNflScoreboardData = (data: any) => {
  console.log(data);
  const formatTeamData = (data: any): TeamData => {
    const teamData = data.team;
    return {
      logo: teamData.logo,
      location: teamData.location,
      name: teamData.name,
      record: data.records[0].summary,
      score: data.score,
      linescores: data.linescores.map(
        (score: { value: number }) => score.value
      ),
      winner: data.winner,
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
      leaders: (competetion.leaders as any[]).map((leader) => {
        return {
          shortDisplayName: leader.shortDisplayName,
          displayValue: leader.leaders[0].displayValue,
          shortName: leader.leaders[0].athlete.shortName,
          position: leader.leaders[0].athlete.position.abbreviation,
          headshot: leader.leaders[0].athlete.headshot,
        };
      }),
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
