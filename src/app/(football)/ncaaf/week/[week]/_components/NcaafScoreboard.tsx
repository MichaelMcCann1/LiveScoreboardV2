import Scoreboard from "@/components/Scoreboard/Scoreboard";
import { NcaafUrl } from "@/constants";
import { getNcaafScoreboardData } from "@/api/ncaafAPI";
import React from "react";

interface Props {
  week: string;
}

export default async function NcaafScoreboard({ week }: Props) {
  const data = await getNcaafScoreboardData(week);

  return <Scoreboard data={data} sport={NcaafUrl} />;
}
