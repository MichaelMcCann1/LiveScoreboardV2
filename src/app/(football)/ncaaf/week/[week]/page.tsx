import ScoreboardHeader from "@/components/ScoreboardHeader/ScoreboardHeader";
import React from "react";
import NcaafScoreboard from "./_components/NcaafScoreboard";
import { getNcaaWeeks } from "@/utils/NCAAF/getNcaafWeeks";
import { NcaafUrl } from "@/constants";
import WeekPicker from "@/components/ScoreboardHeader/components/weekPicker";
import WeekButtons from "@/components/ScoreboardHeader/components/weekButtons";

interface Props {
  params: { week: string };
}

export default async function page({ params }: Props) {
  const week = params.week;
  const weeksList = getNcaaWeeks();

  return (
    <ScoreboardHeader
      sport="NCAAF"
      scoreboard={<NcaafScoreboard week={week} />}
    >
      <WeekPicker
        currentWeek={week}
        weeksList={weeksList}
        sportRoute={NcaafUrl}
      />
      <WeekButtons
        currentWeek={week}
        weeksList={weeksList}
        sportRoute={NcaafUrl}
      />
    </ScoreboardHeader>
  );
}
