import React, { Fragment } from "react";
import TeamScheduleBox from "./TeamScheduleBox/TeamScheduleBox";
import Divider from "@/components/Divider";
import {
  getNflTeamSchedulePostSeason,
  getNflTeamScheduleRegular,
} from "@/lib/nflAPI";
import WidgetWrapper from "@/components/WidgetWrapper";
import { isEmpty, times } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  team: string;
}

export default async function TeamSchedule({ team }: Props) {
  const [regularSeasonData, postSeasonData] = await Promise.all([
    getNflTeamScheduleRegular(team),
    getNflTeamSchedulePostSeason(team),
  ]);

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

TeamSchedule.Skeleton = function TeamScheduleSkeleton() {
  return (
    <WidgetWrapper.Skeleton maxWidth={300}>
      <div className="flex flex-col gap-4 py-4">
        {times(8).map((week) => (
          <Skeleton key={week} className="w-full h-9" />
        ))}
      </div>
    </WidgetWrapper.Skeleton>
  );
};
