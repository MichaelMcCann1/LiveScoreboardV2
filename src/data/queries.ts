"use client";

import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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
  id: string;
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
          id: leader.leaders[0].athlete.id,
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

const formatNflTeamStatData = (data: any) => {
  const passingYards = data.splits.categories[1].stats[22];
  const rushingYards = data.splits.categories[2].stats[5];
  const pointsPerGame = data.splits.categories[9].stats[9];
  const sacks = data.splits.categories[4].stats[14];

  return [passingYards, rushingYards, pointsPerGame, sacks].map((stat) => {
    return {
      stat: stat.displayName,
      value: stat.displayValue,
      rank: stat.rank,
    };
  });
};

export const useNflTeamStats = (team: string) => {
  return useQuery({
    queryKey: ["nflTeamStats", team],
    queryFn: async () => {
      return axiosHandler(
        `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${team}/statistics`
      );
    },
    select: (data) => formatNflTeamStatData(data),
  });
};

interface NflTeamLeaderData {
  displayName: string;
  value: string;
  athlete: NflTeamLeaderAthleteData;
  category: Categories;
}

interface NflTeamLeaderAthleteData {
  fullName: string;
  headshot: string;
  position: string;
  jersey: string;
  id: string;
}
export type Categories = "Offense" | "Defense";

const formatNflTeamLeaderLinks = (data: any) => {
  const formatData = (data: any, category: Categories) => {
    return {
      displayName: data.displayName,
      value: data.leaders[0].value,
      athlete: data.leaders[0].athlete.$ref,
      category,
    };
  };

  const passsingData = data.categories[3];
  const rushingData = data.categories[4];
  const receivingData = data.categories[5];
  const tacklesData = data.categories[6];
  const sacksData = data.categories[7];
  const interceptionsData = data.categories[8];

  const offenseData = [passsingData, rushingData, receivingData].map((data) =>
    formatData(data, "Offense")
  );
  const defenseData = [tacklesData, sacksData, interceptionsData].map((data) =>
    formatData(data, "Defense")
  );

  return [...offenseData, ...defenseData];
};

const formatNflLeaderData = (data: any) => {
  return {
    fullName: data.fullName,
    headshot: data.headshot.href,
    position: data.position.abbreviation,
    jersey: data.jersey,
    id: data.id,
  } as NflTeamLeaderAthleteData;
};

export const useNflTeamLeaders = (team: string) => {
  const teamLeaderData = useQuery({
    queryKey: ["nflTeamLeader"],
    queryFn: async () => {
      return axiosHandler(
        `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${team}/leaders`
      );
    },
    select: (data) => formatNflTeamLeaderLinks(data),
  });

  const leaderQueries = useQueries({
    queries:
      teamLeaderData.data?.map((leader) => {
        return {
          queryKey: ["leaderData", leader.athlete],
          queryFn: async () => {
            return axiosHandler(leader.athlete);
          },
          select: (data: any) => formatNflLeaderData(data),
          enabled: !!leader.athlete,
        };
      }) || [],
  });

  const finalData = useMemo(() => {
    if (leaderQueries.every((query) => query.data)) {
      const newData = teamLeaderData.data?.map((leader, index) => {
        return {
          ...leader,
          athlete: leaderQueries[index].data,
        };
      });

      return {
        ...teamLeaderData,
        data: newData,
      };
    }

    return { ...teamLeaderData, isLoading: true };
  }, [teamLeaderData, leaderQueries]);

  return finalData as UseQueryResult<NflTeamLeaderData[], Error>;
};

export const useNflPlayer = (playerID: string) => {
  return useQuery({
    queryKey: ["nflPlayer", playerID],
    queryFn: async () => {
      return axiosHandler(
        `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${playerID}/overview`
      );
    },
    select: (data) => data,
  });
};
