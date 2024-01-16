import { Suspense } from "react";
import TeamBanner from "../../../../components/TeamPage/TeamBanner/TeamBanner";
import TeamLeaders from "../../../../components/TeamPage/TeamLeaders/TeamLeaders";
import TeamSchedule from "../../../../components/TeamPage/TeamSchedule/TeamSchedule";
import TeamStandings from "../../../../components/TeamPage/TeamStandings/TeamStandings";
import TeamStats from "../../../../components/TeamPage/TeamStats/TeamStats";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;

  return (
    <div className="flex flex-col">
      <Suspense fallback={<TeamBanner.Skeleton />}>
        <TeamBanner team={team} />
      </Suspense>
      <div className="flex gap-4 justify-center items-start">
        <Suspense fallback={<TeamSchedule.Skeleton />}>
          <TeamSchedule team={team} />
        </Suspense>
        <Suspense fallback={<TeamLeaders.Skeleton />}>
          <TeamLeaders team={team} />
        </Suspense>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<TeamStandings.Skeleton />}>
            <TeamStandings team={team} />
          </Suspense>
          <Suspense fallback={<TeamStats.Skeleton />}>
            <TeamStats team={team} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
