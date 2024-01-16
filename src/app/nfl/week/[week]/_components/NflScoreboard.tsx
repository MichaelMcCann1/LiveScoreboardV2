import Scoreboard from "@/components/Scoreboard/Scoreboard";
import { NflUrl } from "@/lib/constants";
import { getNflScoreboardData } from "@/lib/nflAPI";
import React from "react";

interface Props {
  week: string;
}

export default async function NflScoreboard({ week }: Props) {
  const data = await getNflScoreboardData(week);

  return <Scoreboard data={data} sport={NflUrl} />;
}
