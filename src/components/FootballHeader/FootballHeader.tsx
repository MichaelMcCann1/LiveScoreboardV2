import WeekButtons from "@/app/nfl/week/[week]/_components/weekButtons";
import WeekPicker from "@/app/nfl/week/[week]/_components/weekPicker";
import React, { ReactNode, Suspense } from "react";
import Scoreboard from "../Scoreboard/Scoreboard";

interface Props {
  week: string;
  sport: string;
  children: ReactNode;
}

export default function FootballHeader({ week, sport, children }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center px-6 ">
      <h1 className="text-5xl mt-20 mb-10">{sport} Scoreboard</h1>
      <div className="flex gap-8 mb-10 md:flex-row flex-col items-center">
        <WeekPicker currentWeek={week} />
        <WeekButtons currentWeek={week} />
      </div>
      <Suspense fallback={<Scoreboard.Skeleton />}>{children}</Suspense>
    </div>
  );
}
