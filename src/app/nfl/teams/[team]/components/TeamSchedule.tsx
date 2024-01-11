import React, { Fragment } from "react";
import TeamScheduleBox from "./TeamScheduleBox";
import Divider from "@/components/Divider";
import { getNflTeamSchedule } from "@/lib/nflAPI";

interface Props {
  team: string;
}

export default async function TeamSchedule({ team }: Props) {
  const data = await getNflTeamSchedule(team);

  return (
    <div className="flex flex-col w-[300px] bg-white rounded-xl">
      <span className="py-4 px-2 font-semibold text-lg">2023 Schedule</span>
      <Divider />
      <span className="p-2 uppercase text-xs font-medium">Regular Season</span>
      <Divider />
      {data.map((game) => (
        <Fragment key={game.date}>
          <TeamScheduleBox gameData={game} />
          <Divider />
        </Fragment>
      ))}
    </div>
  );
}
