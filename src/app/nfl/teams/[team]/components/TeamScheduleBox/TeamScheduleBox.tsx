import { NflTeamScheduleData } from "@/lib/types";
import Link from "next/link";
import React from "react";
import Results from "./components/Results";
import GameInfo from "./components/GameInfo";

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
        <img
          src={gameData.logo}
          className="h-[36px]"
          alt={`${gameData.opponentNickname} logo`}
        />
        <span className="text-xs px-2">
          {gameData.homeAway === "home" ? "vs" : "@"}
        </span>
        <span className="font-medium">{gameData.opponentNickname}</span>
        {gameData.winner !== undefined ? (
          <Results
            winner={gameData.winner}
            selectedTeamScore={gameData.selectedTeamScore}
            opponentTeamScore={gameData.opponentTeamScore}
          />
        ) : (
          <GameInfo date={gameData.date} tv={gameData.tv} />
        )}
      </div>
    </Link>
  );
}
