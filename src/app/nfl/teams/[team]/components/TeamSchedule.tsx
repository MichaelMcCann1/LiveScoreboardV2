"use client";

import { useNflTeamSchedule } from "@/data/queries";
import React, { Fragment } from "react";
import TeamScheduleBox from "./TeamScheduleBox";
import Divider from "@/components/Divider";

interface Props {
  team: string;
}

export default function TeamSchedule({ team }: Props) {
  const { isLoading, isError, isSuccess, data } = useNflTeamSchedule(team);

  console.log(data);

  if (isSuccess) {
    return (
      <div className="flex flex-col w-[300px] bg-white rounded-xl">
        <span className="py-4 px-2 font-semibold text-lg">2023 Schedule</span>
        <Divider />
        <span className="p-2 uppercase text-xs font-medium">
          Regular Season
        </span>
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
}
