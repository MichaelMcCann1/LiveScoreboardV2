import React from "react";
import Standing from "./components/Standing";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { times } from "lodash";
import { Separator } from "@/components/ui/separator";
import { StandingsData } from "@/types";

interface Props {
  team: string;
  query: () => Promise<StandingsData[]>;
  sportUrl: string;
  colWidth?: number;
}

export default async function TeamStandings({
  team,
  query,
  sportUrl,
  colWidth,
}: Props) {
  const data = await query();

  const division = data?.find((division) =>
    division?.standings?.some((t) => t?.id === team)
  )!;

  if (!division) {
    return null;
  }

  return (
    <WidgetWrapper title={`${division?.name} Standings`} maxWidth={300}>
      <Standing data={division?.headers} header colWidth={colWidth} />
      <Separator />
      {division?.standings.map((t) => (
        <Standing
          key={t.id}
          data={t.data}
          id={t.id}
          bold={t.id === team}
          sportUrl={sportUrl}
          colWidth={colWidth}
        />
      ))}
    </WidgetWrapper>
  );
}

TeamStandings.Skeleton = function TeamStandingSkeleton() {
  return (
    <WidgetWrapper.Skeleton maxWidth={300}>
      <div className="flex flex-col gap-2 py-4">
        {times(4).map((_, i) => (
          <Skeleton key={i} className="w-full h-6" />
        ))}
      </div>
    </WidgetWrapper.Skeleton>
  );
};
