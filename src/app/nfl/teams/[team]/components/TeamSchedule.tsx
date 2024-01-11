import React, { Fragment } from "react";
import TeamScheduleBox from "./TeamScheduleBox";
import Divider from "@/components/Divider";
import { getNflTeamSchedule } from "@/lib/nflAPI";
import WidgetWrapper from "@/components/WidgetWrapper";

interface Props {
  team: string;
}

export default async function TeamSchedule({ team }: Props) {
  const data = await getNflTeamSchedule(team);

  return (
    <WidgetWrapper title="2023 Schedule" maxWidth={300}>
      <>
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
      </>
    </WidgetWrapper>
  );
}
