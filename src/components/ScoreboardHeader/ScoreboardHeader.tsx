import React, { ReactNode, Suspense } from "react";
import Scoreboard from "../Scoreboard/Scoreboard";

interface Props {
  sport: string;
  children: ReactNode;
  scoreboard: ReactNode;
}

export default function ScoreboardHeader({
  sport,
  children,
  scoreboard,
}: Props) {
  return (
    <div className="flex flex-col gap-4 items-center px-6 ">
      <h1 className="text-5xl mt-20 mb-10 text-center">{sport} Scoreboard</h1>
      <div className="flex gap-8 mb-10 md:flex-row flex-col items-center">
        {children}
      </div>
      <Suspense fallback={<Scoreboard.Skeleton />}>{scoreboard}</Suspense>
    </div>
  );
}
