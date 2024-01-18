import TeamPage from "@/components/TeamPage/TeamPage";
import { NcaafUrl } from "@/constants";
import {
  getNcaafStandings,
  getNcaafTeamBannerData,
  getNcaafTeamLeaderData,
  getNcaafTeamSchedule,
  getNcaafTeamStats,
} from "@/api/ncaafAPI";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;

  return (
    <TeamPage
      team={team}
      sportUrl={NcaafUrl}
      bannerQuery={getNcaafTeamBannerData}
      scheduleQuery={getNcaafTeamSchedule}
      leadersQuery={getNcaafTeamLeaderData}
      standingsQuery={getNcaafStandings}
      statQuery={getNcaafTeamStats}
      colWidth={60}
    />
  );
}
