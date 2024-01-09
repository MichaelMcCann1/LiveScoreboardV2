"use client";

import TeamBanner from "./components/TeamBanner";
import TeamSchedule from "./components/TeamSchedule";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;

  return (
    <div>
      <TeamBanner team={team} />
      <div className="flex gap-4 justify-center">
        <TeamSchedule team={team} />
      </div>
    </div>
  );
}
