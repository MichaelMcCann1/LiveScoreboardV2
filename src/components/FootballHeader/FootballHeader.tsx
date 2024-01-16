import WeekButtons from "@/app/nfl/week/[week]/_components/weekButtons";
import WeekPicker from "@/app/nfl/week/[week]/_components/weekPicker";
import React, { ReactNode, Suspense } from "react";
import Scoreboard from "../Scoreboard/Scoreboard";
import { WeeksList } from "@/lib/types";

interface Props {
  week: string;
  sport: string;
  children: ReactNode;
  weeksList: WeeksList;
  sportRoute: string;
}

export default function FootballHeader({
  week,
  sport,
  children,
  weeksList,
  sportRoute
}: Props) {
  return (
    <div className="flex flex-col gap-4 items-center px-6 ">
      <h1 className="text-5xl mt-20 mb-10">{sport} Scoreboard</h1>
      <div className="flex gap-8 mb-10 md:flex-row flex-col items-center">
        <WeekPicker currentWeek={week} weeksList={weeksList} sportRoute={sportRoute}/>
        <WeekButtons currentWeek={week} weeksList={weeksList} sportRoute={sportRoute}/>
      </div>
      <Suspense fallback={<Scoreboard.Skeleton />}>{children}</Suspense>
    </div>
  );
}
