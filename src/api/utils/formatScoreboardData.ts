import { LeaderData, ScoreboardData, TeamData } from "@/types";

export const formatScoreboardData = (
  data: any,
  getLeaders: (data: any) => LeaderData[]
) => {
  return (data.events as any[])
    ?.map((game: any) => {
      const competetion = game.competitions[0];
      const tv = competetion?.broadcasts?.[0]?.names?.[0];

      return {
        id: competetion?.id,
        date: competetion?.date,
        awayTeamData: formatTeamScoreboardData(competetion?.competitors?.[1]),
        homeTeamData: formatTeamScoreboardData(competetion?.competitors?.[0]),
        status: game?.status?.type?.description,
        clock: game?.status?.displayClock,
        period: game?.status?.period,
        tv: tv === "undefined" ? undefined : tv,
        spread: competetion?.odds?.[0]?.details,
        overUnder: competetion?.odds?.[0]?.overUnder,
        leaders: getLeaders(competetion),
      } as ScoreboardData;
    })
    .filter(
      (game) =>
        game.awayTeamData.name !== "TBD" && game.homeTeamData.name !== "TBD"
    );
};

export const formatTeamScoreboardData = (data: any): TeamData => {
  const teamData = data.team;

  return {
    logo: teamData?.logo,
    location: teamData?.location,
    name: teamData?.name,
    record: data?.records?.[0]?.summary,
    score: data?.score,
    linescores: data?.linescores?.map(
      (score: { value: number }) => score?.value
    ),
    winner: data?.winner,
    id: teamData?.id,
  };
};

export const formatScoreboardLeadersFootball = (competition: any) => {
  return (competition?.leaders as any[])?.map((leader) => {
    return {
      shortDisplayName: leader?.shortDisplayName,
      displayValue: leader?.leaders?.[0]?.displayValue,
      shortName: leader?.leaders?.[0]?.athlete?.shortName,
      position: leader?.leaders?.[0]?.athlete?.position?.abbreviation,
      headshot: leader?.leaders?.[0]?.athlete?.headshot,
      id: leader?.leaders?.[0]?.athlete?.id,
    };
  });
};

export const formatScoreboardLeadersBasketball = (competition: any) => {
  const team1Leaders = competition?.competitors?.[0]?.leaders?.slice(0, 3);
  const team2Leaders = competition?.competitors?.[1]?.leaders?.slice(0, 3);
  const displayLeaders = [] as any[];

  team1Leaders?.forEach((leader: any, index: number) => {
    const team1Leader = leader;
    const team2Leader = team2Leaders[index];

    if (team1Leader.leaders[0].value >= team2Leader.leaders[0].value) {
      displayLeaders.push(team1Leader);
    } else {
      displayLeaders.push(team2Leader);
    }
  });

  return displayLeaders.map((leader) => {
    return {
      shortDisplayName: leader?.shortDisplayName,
      displayValue: leader?.leaders?.[0]?.displayValue,
      shortName: leader?.leaders?.[0]?.athlete?.shortName,
      position: leader?.leaders?.[0]?.athlete?.position?.abbreviation,
      headshot: leader?.leaders?.[0]?.athlete?.headshot,
      id: leader?.leaders?.[0]?.athlete?.id,
    };
  });
};
