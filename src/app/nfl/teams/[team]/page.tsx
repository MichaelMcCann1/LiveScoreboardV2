import { Suspense } from "react";
import TeamBanner from "./_components/TeamBanner";
import TeamLeaders from "./_components/TeamLeaders";
import TeamSchedule from "./_components/TeamSchedule";
import TeamStandings from "./_components/TeamStandings";
import TeamStats from "./_components/TeamStats";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;

  return (
    <div>
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
