import { getNbaScoreboardData } from "@/api/nbaAPI";
import Scoreboard from "@/components/Scoreboard/Scoreboard";
import { NbaUrl } from "@/constants";
import React from "react";

interface Props {
  date: string;
}

export default async function NbaScoreboard({ date }: Props) {
  const data = await getNbaScoreboardData(date);

  return <Scoreboard data={data} sport={NbaUrl} />;
}
