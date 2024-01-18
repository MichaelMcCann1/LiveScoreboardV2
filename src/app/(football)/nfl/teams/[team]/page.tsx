import {
  getNflStandings,
  getNflTeamBannerData,
  getNflTeamLeaderData,
  getNflTeamSchedule,
  getNflTeamStats,
} from "@/api/nflAPI";
import TeamPage from "@/components/TeamPage/TeamPage";
import { NflUrl } from "@/constants";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;

  return (
    <TeamPage
      team={team}
      sportUrl={NflUrl}
      bannerQuery={getNflTeamBannerData}
      scheduleQuery={getNflTeamSchedule}
      leadersQuery={getNflTeamLeaderData}
      standingsQuery={getNflStandings}
      statQuery={getNflTeamStats}
    />
  );
}
