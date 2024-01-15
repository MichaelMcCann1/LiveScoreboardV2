import Divider from "@/components/Divider";
import React from "react";
import Standing from "./Standing";
import { getNflStandings } from "@/lib/nflAPI";
import WidgetWrapper from "@/components/WidgetWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { times } from "lodash";

interface Props {
  team: string;
}

export default async function TeamStandings({ team }: Props) {
  const data = await getNflStandings();

  const division = data.find((division) =>
    division.standings.some((t) => t.abbreviation === team)
  );

  return (
    <WidgetWrapper title={`${division?.name} Standings`} maxWidth={300}>
      <Standing
        team={"Team"}
        wins={"W"}
        losses={"L"}
        ties={"T"}
        pct={"PCT"}
        header
      />
      <Divider />
      {division?.standings.map((t) => (
        <Standing
          key={t.abbreviation}
          team={t.location}
          wins={t.wins}
          losses={t.losses}
          ties={t.ties}
          pct={t.pct}
          abbreviation={t.abbreviation}
          bold={t.abbreviation === team}
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
