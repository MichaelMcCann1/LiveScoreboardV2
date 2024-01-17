import { ScoreboardData, TeamData } from "@/lib/types";

export const formatScoreboardData = (data: any) => {
  return (data.events as any[])
    .map((game: any) => {
      const competetion = game.competitions[0];

      return {
        id: competetion?.id,
        date: competetion?.date,
        awayTeamData: formatTeamScoreboardData(competetion?.competitors?.[1]),
        homeTeamData: formatTeamScoreboardData(competetion?.competitors?.[0]),
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
            position: leader?.leaders?.[0]?.athlete?.position?.id,
            headshot: leader?.leaders?.[0]?.athlete?.headshot,
            id: leader?.leaders?.[0]?.athlete?.id,
          };
        }),
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
