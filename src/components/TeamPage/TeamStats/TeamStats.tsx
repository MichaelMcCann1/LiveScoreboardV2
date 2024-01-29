import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { isEmpty, times } from "lodash";
import React from "react";
import indicator from "ordinal/indicator";
import { TeamStat } from "@/types";

interface Props {
  team: string;
  query: (team: string) => Promise<TeamStat[]>;
}

export default async function TeamStats({ team, query }: Props) {
  const data = await query(team);

  if (isEmpty(data)) {
    return null;
  }

  return (
    <WidgetWrapper title="Team Stats" maxWidth={300}>
      <div className="grid grid-cols-2 gap-2 pt-2">
        {data?.map((stat) => (
          <div
            key={stat.stat}
            className="flex flex-col items-center border rounded-lg"
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
