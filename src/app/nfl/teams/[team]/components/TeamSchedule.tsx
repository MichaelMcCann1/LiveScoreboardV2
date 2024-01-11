import React, { Fragment } from "react";
import TeamScheduleBox from "./TeamScheduleBox/TeamScheduleBox";
import Divider from "@/components/Divider";
import {
  getNflTeamSchedulePostSeason,
  getNflTeamScheduleRegular,
} from "@/lib/nflAPI";
import WidgetWrapper from "@/components/WidgetWrapper";
import { isEmpty } from "lodash";

interface Props {
  team: string;
}

export default async function TeamSchedule({ team }: Props) {
  const regularSeasonData = await getNflTeamScheduleRegular(team);
  const postSeasonData = await getNflTeamSchedulePostSeason(team);

  const data = [{ title: "Regular Season", scheduleData: regularSeasonData }];
  if (!isEmpty(postSeasonData)) {
    data.unshift({ title: "PostSeason", scheduleData: postSeasonData });
  }
  
  return (
    <WidgetWrapper title="2023 Schedule" maxWidth={300}>
      {data.map((season) => (
        <Fragment key={season.title}>
          <span className="p-2 uppercase text-xs font-medium">
            {season.title}
          </span>
          <Divider />
          {season.scheduleData.map((game) => (
            <Fragment key={game.date}>
              <TeamScheduleBox gameData={game} />
              <Divider />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </WidgetWrapper>
  );
}
