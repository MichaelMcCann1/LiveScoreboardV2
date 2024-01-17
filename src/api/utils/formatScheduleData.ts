import { NflTeamScheduleData, ScheduleData } from "@/lib/types";
import { isEmpty } from "lodash";

export const formatScheduleData = (data: any, team: string) => {
  return (data.events as any[]).map((game) => {
    const gameData = game.competitions[0];

    const selectedTeamData = (gameData.competitors as any[]).find(
      (competitor) => competitor.team.id === team
    );
    const opponentData = (gameData.competitors as any[]).find(
      (competitor) => competitor.team.id !== team
    );

    return {
      date: gameData?.date,
      tv: gameData?.broadcasts?.[0]?.media?.shortName,
      logo: opponentData?.team?.logos?.[0]?.href,
      homeAway: selectedTeamData?.homeAway,
      opponentNickname: opponentData?.team?.nickname,
      opponentAbbreviation: opponentData?.team?.id,
      winner: selectedTeamData?.winner,
      selectedTeamScore: selectedTeamData?.score?.displayValue,
      opponentTeamScore: opponentData?.score?.displayValue,
    } as NflTeamScheduleData;
  });
};

export const filterScheduleData = (
  regularSeasonData: NflTeamScheduleData[],
  postSeasonData: NflTeamScheduleData[]
) => {
  const data = [{ title: "Regular Season", scheduleData: regularSeasonData }];
  if (!isEmpty(postSeasonData)) {
    data.unshift({ title: "PostSeason", scheduleData: postSeasonData });
  }

  return data as ScheduleData[];
};
