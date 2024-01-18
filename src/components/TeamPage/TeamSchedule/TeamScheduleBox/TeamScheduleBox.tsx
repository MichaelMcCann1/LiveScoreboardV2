import { TeamScheduleData } from "@/types";
import Link from "next/link";
import React from "react";
import Results from "./components/Results";
import GameInfo from "./components/GameInfo";

interface Props {
  gameData: TeamScheduleData;
  sportUrl: string;
}

export default function TeamScheduleBox({ gameData, sportUrl }: Props) {
  return (
    <Link
      className="p-2 hover:bg-gray-200 text-sm"
      href={`/${sportUrl}/teams/${gameData.opponentId}`}
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
        <span className="font-medium text-sm">{gameData.opponentNickname}</span>
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
