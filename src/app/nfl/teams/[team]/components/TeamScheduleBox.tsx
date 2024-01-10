import { NflTeamScheduleData } from "@/data/queries";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

const formatScore = (selectedTeamScore: number, opponentScore: number) => {
  if (selectedTeamScore > opponentScore) {
    return `${selectedTeamScore}-${opponentScore}`;
  } else {
    return `${opponentScore}-${selectedTeamScore}`;
  }
};

interface Props {
  gameData: NflTeamScheduleData;
}

export default function TeamScheduleBox({ gameData }: Props) {
  return (
    <Link
      className="p-2 hover:bg-gray-200 text-sm"
      href={`/nfl/teams/${gameData.opponentAbbreviation}`}
    >
      <div className="flex items-center relative">
        <img src={gameData.logo} className="h-[35px]" />
        <span className="text-xs px-2">
          {gameData.homeAway === "home" ? "vs" : "@"}
        </span>
        <span className="font-medium">{gameData.opponentNickname}</span>
        <span
          className={classNames(
            "font-semibold absolute right-[70px] text-center w-5",
            gameData.winner ? "text-green-600" : "text-red-600"
          )}
        >
          {gameData.winner ? "W" : "L"}
        </span>
        <span className="ml-auto">
          {formatScore(
            Number(gameData.selectedTeamScore),
            Number(gameData.opponentTeamScore)
          )}
        </span>
      </div>
    </Link>
  );
}
