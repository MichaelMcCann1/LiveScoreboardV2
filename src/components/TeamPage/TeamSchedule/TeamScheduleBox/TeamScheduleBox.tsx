import { TeamScheduleData } from "@/types";
import Link from "next/link";
import React from "react";
import Results from "./components/Results";
import GameInfo from "./components/GameInfo";
import Image from "next/image";

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
        <Image
          src={gameData.logo}
          alt={`${gameData.opponentNickname} logo`}
          width={36}
          height={36}
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
