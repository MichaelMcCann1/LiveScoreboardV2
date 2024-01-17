export const getWeek = (data: any, leagueWeeks: number) => {
  const season = data?.season?.type as number;
  const week = data?.week?.number as number;

  return season === 3 ? week + leagueWeeks : week;
}