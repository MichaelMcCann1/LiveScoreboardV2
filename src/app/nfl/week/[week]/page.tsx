import React, { Suspense } from "react";
import { times } from "lodash";
import ScoreboardContent from "./_components/ScoreboardContent";
import WeekPicker from "./_components/weekPicker";
import WeekButtons from "./_components/weekButtons";

export const getWeeks = () => {
  const regularSeasonWeeks = times(18).map((week) => {
    return {
      week: week + 1,
      text: `Week ${week + 1}`,
    };
  });
  const playoffWeeks = [
    { week: 19, text: "Wild Card" },
    { week: 20, text: "Divisonal" },
    { week: 21, text: "Conf Champ" },
    { week: 22, text: "Pro Bowl" },
    { week: 23, text: "Super Bowl" },
  ];
  return [...regularSeasonWeeks, ...playoffWeeks];
};

interface Props {
  params: { week: string };
}

export default async function page({ params }: Props) {
  const currentWeek = params.week;

  return (
    <div className="flex flex-col gap-4 items-center pb-10">
      <h1 className="text-5xl mt-20 mb-10">NFL Scoreboard</h1>
      <div className="flex gap-8 mb-10">
        <WeekPicker currentWeek={currentWeek} />
        <WeekButtons currentWeek={currentWeek} />
      </div>
      <Suspense fallback={<ScoreboardContent.Skeleton />}>
        <ScoreboardContent week={currentWeek} />
      </Suspense>
    </div>
  );
}
