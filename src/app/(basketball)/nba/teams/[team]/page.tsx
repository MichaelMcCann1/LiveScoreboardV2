import {
  getNbaStandings,
  getNbaTeamBannerData,
  getNbaTeamLeaderData,
  getNbaTeamSchedule,
  getNbaTeamStats,
} from "@/api/nbaAPI";
import TeamPage from "@/components/TeamPage/TeamPage";
import { NbaUrl } from "@/constants";
import React from "react";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;

  return (
    <TeamPage
      team={team}
      sportUrl={NbaUrl}
      bannerQuery={getNbaTeamBannerData}
      scheduleQuery={getNbaTeamSchedule}
      leadersQuery={getNbaTeamLeaderData}
      standingsQuery={getNbaStandings}
      statQuery={getNbaTeamStats}
    />
  );
}
