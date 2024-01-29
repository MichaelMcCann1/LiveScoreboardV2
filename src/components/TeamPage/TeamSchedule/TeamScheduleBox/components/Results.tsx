import { cn } from "@/lib/utils";
import React from "react";

const formatScore = (selectedTeamScore: number, opponentScore: number) => {
  if (selectedTeamScore > opponentScore) {
    return `${selectedTeamScore}-${opponentScore}`;
  } else {
    return `${opponentScore}-${selectedTeamScore}`;
  }
};

interface Props {
  winner: boolean;
  selectedTeamScore?: string;
  opponentTeamScore?: string;
}

export default function Results({
  winner,
  selectedTeamScore,
  opponentTeamScore,
}: Props) {
  return (
    <>
      <span
        className={cn(
          "font-semibold absolute right-[55px] text-center w-5",
          winner ? "text-green-600" : "text-red-600"
        )}
      >
        {winner ? "W" : "L"}
      </span>
      <span className="ml-auto">
        {formatScore(Number(selectedTeamScore), Number(opponentTeamScore))}
      </span>
    </>
  );
}
