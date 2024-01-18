import Scoreboard from "@/components/Scoreboard/Scoreboard";
import { NflUrl } from "@/constants";
import { getNflScoreboardData } from "@/api/nflAPI";
import React from "react";

interface Props {
  week: string;
}

export default async function NflScoreboard({ week }: Props) {
  const data = await getNflScoreboardData(week);

  return <Scoreboard data={data} sport={NflUrl} />;
}
