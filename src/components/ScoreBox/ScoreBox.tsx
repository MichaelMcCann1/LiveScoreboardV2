import { NflScoreboardData } from "@/data/queries";
import { DateTime } from "luxon";
import React from "react";
import TeamBox from "./components/TeamBox";
import Linescores from "./components/Linescores";
import Leader from "./components/Leader";

const periods = [1, 2, 3, 4];

const getTimeDisplay = (gameData: NflScoreboardData) => {
  const getPeriodDisplay = (period: number) => {
    if (period === 1) return "1st";
    if (period === 2) return "2nd";
    if (period === 3) return "3rd";
    if (period === 4) return "4th";
    return "OT";
  };

  if (gameData.status === "Final") return "Final";
  if (gameData.status === "In Progress") {
    return `${gameData.clock} ${getPeriodDisplay(gameData.period)} - ${
      gameData.tv
    }`;
  }
  if (gameData.status === "Scheduled") {
    return `${DateTime.fromISO(gameData.date).weekdayShort} 
    ${DateTime.fromISO(gameData.date).toFormat("h:mma")} - ${gameData.tv}`;
  }
};

interface Props {
  gameData: NflScoreboardData;
}

export default function ScoreBox({ gameData }: Props) {
  return (
    <div className="flex gap-14 py-3">
      <div className="flex flex-col w-full">
        <div className="flex gap-3 w-full items-center">
          <span className="text-sm font-semibold">
            {getTimeDisplay(gameData)}
          </span>
          <Linescores periods={periods} />
        </div>
        <TeamBox teamData={gameData.awayTeamData} />
        <TeamBox teamData={gameData.homeTeamData} />
      </div>
      <div className="flex flex-col gap-2">
        {gameData.leaders.map((leader) => (
          <Leader key={leader.shortDisplayName} leader={leader} />
        ))}
      </div>
    </div>
  );
}
