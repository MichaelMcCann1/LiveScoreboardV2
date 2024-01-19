import React, { Fragment } from "react";
import TeamScheduleBox from "./TeamScheduleBox/TeamScheduleBox";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { times } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScheduleData } from "@/types";

interface Props {
  team: string;
  query: (team: string) => Promise<ScheduleData[]>;
  sportUrl: string;
}

export default async function TeamSchedule({ team, query, sportUrl }: Props) {
  const data = await query(team);

  if (!data || (data?.length === 1 && !data[0]?.scheduleData)) {
    return null;
  }

  return (
    <WidgetWrapper title="2023 Schedule" maxWidth={300}>
      {data?.map((season) => (
        <Fragment key={season.title}>
          <span className="p-2 uppercase text-xs font-medium">
            {season.title}
          </span>
          <Separator />
          {season?.scheduleData?.map((game) => (
            <Fragment key={game.date}>
              <TeamScheduleBox gameData={game} sportUrl={sportUrl} />
              <Separator />
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
