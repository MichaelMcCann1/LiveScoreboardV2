import React from "react";
import NbaScoreboard from "./_components/NbaScoreboard";
import ScoreboardHeader from "@/components/ScoreboardHeader/ScoreboardHeader";

interface Props {
  params: { date: string };
}

export default function page({ params }: Props) {
  const date = params.date;

  return (
    <ScoreboardHeader sport="NBA" scoreboard={<NbaScoreboard date={date} />}>
      <div>hi</div>
    </ScoreboardHeader>
  );
}
