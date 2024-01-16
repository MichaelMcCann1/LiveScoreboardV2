import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { getNflTeamStats } from "@/lib/nflAPI";
import { times } from "lodash";
import React from "react";
import indicator from "ordinal/indicator";

interface Props {
  team: string;
}

export default async function TeamStats({ team }: Props) {
  const data = await getNflTeamStats(team);

  return (
    <WidgetWrapper title="Team Stats" maxWidth={300}>
      <div className="grid grid-cols-2 gap-2 pt-2">
        {data?.map((stat) => (
          <div
            key={stat.stat}
            className="flex flex-col h-full items-center border rounded-lg"
          >
            <span className="text-sm font-extralight text-center flex-[2]">
              {stat.stat}
            </span>
            <span className="text-2xl font-semibold my-1 flex-1">
              {stat.value}
            </span>
            <span className="flex-1 font-light">
              {stat.rank}
              <sup>{indicator(stat.rank)}</sup>
            </span>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}

TeamStats.Skeleton = function TeamStatsSkeleton() {
  return (
    <WidgetWrapper.Skeleton maxWidth={300}>
      <div className="grid grid-cols-2 gap-2 pt-2 pb-4">
        {times(4).map((stat) => (
          <Skeleton key={stat} className="h-[100px]" />
        ))}
      </div>
    </WidgetWrapper.Skeleton>
  );
};
