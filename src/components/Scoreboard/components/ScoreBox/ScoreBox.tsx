import { DateTime } from "luxon";
import React from "react";
import TeamBox from "./components/TeamBox";
import Linescores from "./components/Linescores";
import Leader from "./components/Leader";
import { ScoreboardData } from "@/types";

const getPeriodsDisplay = (count: number) => {
  const periods = [1, 2, 3, 4] as (number | string)[];

  const overtimePeriods = count - 4;
  for (let i = 0; i < overtimePeriods; i++) {
    if (i === 0) {
      periods.push("OT");
    } else {
      periods.push(`${i + 1}OT`);
    }
  }

  return periods
};

const getTimeDisplay = (gameData: ScoreboardData) => {
  const getPeriodDisplay = (period: number) => {
    if (period === 1) return "1st";
    if (period === 2) return "2nd";
    if (period === 3) return "3rd";
    if (period === 4) return "4th";
    return "OT";
  };

  if (gameData.status === "Final") return "Final";
  if (gameData.status === "In Progress") {
    return `${gameData.clock} ${getPeriodDisplay(gameData.period)} ${
      gameData.tv ? `- ${gameData.tv}` : ""
    }`;
  }
  if (gameData.status === "Scheduled") {
    return `${DateTime.fromISO(gameData.date).toFormat("h:mma")} ${
      gameData.tv ? `- ${gameData.tv}` : ""
    }`;
  }
};

interface Props {
  gameData: ScoreboardData;
  sport: string;
}

export default function ScoreBox({ gameData, sport }: Props) {
  return (
    <div className="flex gap-14 py-3">
      <div className="flex flex-col w-full">
        <div className="flex gap-3 w-full items-center">
          <span className="text-sm font-semibold">
            {getTimeDisplay(gameData)}
          </span>
          {gameData.status !== "Scheduled" &&
            gameData.status !== "Postponed" && (
              <Linescores
                periods={getPeriodsDisplay(
                  gameData?.awayTeamData?.linescores?.length
                )}
                final={true}
              />
            )}
        </div>
        <TeamBox
          teamData={gameData.awayTeamData}
          oddsType={"Spread"}
          odds={gameData.spread}
          sport={sport}
          status={gameData.status}
        />
        <TeamBox
          teamData={gameData.homeTeamData}
          oddsType={"Total"}
          odds={gameData.overUnder}
          sport={sport}
          status={gameData.status}
        />
      </div>
      <div className="hidden flex-col gap-2 md:flex">
        {gameData?.leaders?.map((leader) => (
          <Leader key={leader.shortDisplayName} leader={leader} sport={sport} />
        ))}
      </div>
    </div>
  );
}
