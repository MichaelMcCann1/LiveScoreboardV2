"use client";

import TeamBanner from "./components/TeamBanner";
import TeamSchedule from "./components/TeamSchedule";
import TeamStandings from "./components/TeamStandings";

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
        <TeamStandings team={team}/>
      </div>
    </div>
  );
}
