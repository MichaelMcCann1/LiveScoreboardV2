"use client";

import TeamBanner from "./components/TeamBanner";
import TeamLeaders from "./components/TeamLeaders";
import TeamSchedule from "./components/TeamSchedule";
import TeamStandings from "./components/TeamStandings";
import TeamStats from "./components/TeamStats";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;

  return (
    <div>
      <TeamBanner team={team} />
      <div className="flex gap-4 justify-center items-start">
        <TeamSchedule team={team} />
        <TeamLeaders team={team}/>
        <div className="flex flex-col gap-4">
          <TeamStandings team={team} />
          <TeamStats team={team} />
        </div>
      </div>
    </div>
  );
}
