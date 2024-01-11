import {
  Categories,
  NflPlayerData,
  NflScoreboardData,
  NflStandingsData,
  NflTeamBannerData,
  NflTeamLeaderAthleteData,
  NflTeamLeaderData,
  NflTeamScheduleData,
  NflTeamStandingsData,
  TeamData,
} from "./types";

const formatTeamData = (data: any): TeamData => {
  const teamData = data.team;
  return {
    logo: teamData.logo,
    location: teamData.location,
    name: teamData.name,
    record: data.records[0].summary,
    score: data.score,
    linescores: data.linescores.map((score: { value: number }) => score.value),
    winner: data.winner,
    abbreviation: teamData.abbreviation,
  };
};

export const getNflScoreboardData = async () => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`
  );
  const data = await reponse.json();

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

export const getNflPlayerPageData = async (playerID: string) => {
  const playerDataResponse = await fetch(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/athletes/${playerID}`
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
    draft: playerData.draft.displayText,
    headshot: playerData.headshot.href,
    teamLink: playerData.team.$ref,
    age: playerData.age,
    city: playerData.birthPlace.city,
    state: playerData.birthPlace.state,
    location: teamData.location,
    nickname: teamData.nickname,
    logo: teamData.logos[0].href,
    abbreviation: teamData.abbreviation,
  } as NflPlayerData;
};

export const getNflTeamBannerData = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}`
  );
  const data = await reponse.json();

  const teamData = data.team;
  return {
    location: teamData.location,
    nickname: teamData.nickname,
    standingSummary: teamData.standingSummary,
    logo: teamData.logos[0].href,
    record: teamData.record.items[0].summary,
  } as NflTeamBannerData;
};

const formatScheduleData = (data: any, team: string) => {
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

export const getNflTeamScheduleRegular = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}/schedule?seasontype=2`
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

export const getNflTeamSchedulePostSeason = async (team: string) => {
  const reponse = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}/schedule?seasontype=3`
  );
  const data = await reponse.json();
  return formatScheduleData(data, team);
};

export const getNflStandings = async () => {
  const reponse = await fetch(`https://cdn.espn.com/core/nfl/standings?xhr=1`);
  const data = await reponse.json();

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

export const getNflTeamStats = async (team: string) => {
  const reponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${team}/statistics`
  );
  const data = await reponse.json();

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

export const getNflTeamLeaderData = async (team: string) => {
  const leaderSResponse = await fetch(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/${team}/leaders`
  );
  const data = await leaderSResponse.json();

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

  const orderedLeaders = [...offenseData, ...defenseData];
  return (await Promise.all(
    orderedLeaders.map(async (leader) => {
      const athleteReponse = await fetch(leader.athlete);
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
