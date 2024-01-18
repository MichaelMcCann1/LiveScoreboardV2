import React from "react";
import ScoreboardHeader from "@/components/ScoreboardHeader/ScoreboardHeader";
import NflScoreboard from "./_components/NflScoreboard";
import { getNflWeeks } from "@/utils/NFL/getNflWeeks";
import { NflUrl } from "@/constants";
import WeekPicker from "@/components/ScoreboardHeader/components/weekPicker";
import WeekButtons from "@/components/ScoreboardHeader/components/weekButtons";

interface Props {
  params: { week: string };
}

export default async function page({ params }: Props) {
  const week = params.week;
  const weeksList = getNflWeeks();

  return (
    <ScoreboardHeader sport="NFL" scoreboard={<NflScoreboard week={week} />}>
      <WeekPicker
        currentWeek={week}
        weeksList={weeksList}
        sportRoute={NflUrl}
      />
      <WeekButtons
        currentWeek={week}
        weeksList={weeksList}
        sportRoute={NflUrl}
      />
    </ScoreboardHeader>
  );
}
