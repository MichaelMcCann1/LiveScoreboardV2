import React, { Suspense } from "react";
import TeamBanner from "./TeamBanner/TeamBanner";
import {
  TeamBannerData,
  TeamLeaderData,
  ScheduleData,
  StandingsData,
  TeamStat,
} from "@/lib/types";
import TeamSchedule from "./TeamSchedule/TeamSchedule";
import TeamLeaders from "./TeamLeaders/TeamLeaders";
import TeamStandings from "./TeamStandings/TeamStandings";
import TeamStats from "./TeamStats/TeamStats";

interface Props {
  team: string;
  sportUrl: string;
  colWidth?: number;
  bannerQuery: (team: string) => Promise<TeamBannerData>;
  scheduleQuery: (team: string) => Promise<ScheduleData[]>;
  leadersQuery: (team: string) => Promise<TeamLeaderData[]>;
  standingsQuery: () => Promise<StandingsData[]>;
  statQuery: (team: string) => Promise<TeamStat[]>;
}

export default function TeamPage({
  team,
  sportUrl,
  colWidth,
  bannerQuery,
  scheduleQuery,
  leadersQuery,
  standingsQuery,
  statQuery,
}: Props) {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<TeamBanner.Skeleton />}>
        <TeamBanner team={team} query={bannerQuery} />
      </Suspense>
      <div className="flex gap-4 justify-center items-start">
        <Suspense fallback={<TeamSchedule.Skeleton />}>
          <TeamSchedule team={team} query={scheduleQuery} sportUrl={sportUrl} />
        </Suspense>
        <Suspense fallback={<TeamLeaders.Skeleton />}>
          <TeamLeaders team={team} query={leadersQuery} sportUrl={sportUrl} />
        </Suspense>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<TeamStandings.Skeleton />}>
            <TeamStandings
              team={team}
              query={standingsQuery}
              sportUrl={sportUrl}
              colWidth={colWidth}
            />
          </Suspense>
          <Suspense fallback={<TeamStats.Skeleton />}>
            <TeamStats team={team} query={statQuery} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
