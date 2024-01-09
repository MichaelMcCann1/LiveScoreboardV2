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
  abbreviation: string;
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
      abbreviation: teamData.abbreviation,
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

interface NflTeamBannerData {
  location: string;
  nickname: string;
  standingSummary: string;
  logo: string;
  record: string;
}

const formatNflTeamBannerData = (data: any) => {
  const teamData = data.team;

  return {
    location: teamData.location,
    nickname: teamData.nickname,
    standingSummary: teamData.standingSummary,
    logo: teamData.logos[0].href,
    record: teamData.record.items[0].summary,
  } as NflTeamBannerData;
};

export const useNflTeamBanner = (team: string) => {
  return useQuery({
    queryKey: ["nflTeam"],
    queryFn: async () => {
      return axiosHandler(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}`
      );
    },
    select: (data) => formatNflTeamBannerData(data),
  });
};

export interface NflTeamScheduleData {
  date: string;
  tv: string;
  logo: string;
  homeAway: "home" | "away";
  opponentNickname: string;
  opponentAbbreviation: string;
  winner: boolean;
  selectedTeamScore: string;
  opponentTeamScore: string;
}

const formatNflTeamSchedule = (data: any, team: string) => {
  return (data.events as any[]).map((game) => {
    const gameData = game.competitions[0];

    const selectedTeamData = (gameData.competitors as any[]).find(
      (competitor) => competitor.team.abbreviation === team
    );
    const opponentData = (gameData.competitors as any[]).find(
      (competitor) => competitor.team.abbreviation !== team
    );

    return {
      date: gameData.date,
      tv: gameData.broadcasts[0].media.shortName,
      logo: opponentData.team.logos[0].href,
      homeAway: selectedTeamData.homeAway,
      opponentNickname: opponentData.team.nickname,
      opponentAbbreviation: opponentData.team.abbreviation,
      winner: selectedTeamData.winner,
      selectedTeamScore: selectedTeamData.score.displayValue,
      opponentTeamScore: opponentData.score.displayValue,
    } as NflTeamScheduleData;
  });
};

export const useNflTeamSchedule = (team: string) => {
  return useQuery({
    queryKey: ["nflTeamSchedule", team],
    queryFn: async () => {
      return axiosHandler(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}/schedule?seasontype=2`
      );
    },
    select: (data) => formatNflTeamSchedule(data, team),
  });
};

interface NflStandingsData {
  name: string;
  standings: NflTeamStandingsData[];
}

interface NflTeamStandingsData {
  abbreviation: string;
  location: string;
  wins: string;
  losses: string;
  ties: string;
  pct: string;
}

const formatNflStandings = (data: any) => {
  const divisions = [
    ...data.content.standings.groups[0].groups,
    ...data.content.standings.groups[1].groups,
  ];

  return divisions.map((division) => {
    return {
      name: division.name,
      standings: (division.standings.entries as any[]).map((entry) => {
        return {
          abbreviation: entry.team.abbreviation,
          location: entry.team.location,
          wins: entry.stats[0].displayValue,
          losses: entry.stats[1].displayValue,
          ties: entry.stats[2].displayValue,
          pct: entry.stats[3].displayValue,
        } as NflTeamStandingsData;
      }),
    } as NflStandingsData;
  });
};

export const useNflStandings = () => {
  return useQuery({
    queryKey: ["nflStandings"],
    queryFn: async () => {
      return axiosHandler(`https://cdn.espn.com/core/nfl/standings?xhr=1`);
    },
    select: (data) => formatNflStandings(data),
  });
};
