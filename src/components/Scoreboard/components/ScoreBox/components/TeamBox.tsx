import React from "react";
import Linescores from "./Linescores";
import Link from "next/link";
import { TeamData } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  teamData: TeamData;
  odds?: string;
  oddsType: string;
  sport: string;
  final: boolean;
}

export default function TeamBox({
  teamData,
  odds,
  oddsType,
  sport,
  final,
}: Props) {
  return (
    <div className={"flex h-14 py-2 items-center gap-2"}>
      <Link
        href={`/${sport}/teams/${teamData.id}`}
        className="h-full flex items-center gap-2"
      >
        <img
          className="h-full"
          src={teamData.logo}
          alt={`${teamData.name} logo`}
        />
        <div
          className={cn(
            "flex flex-col",
            teamData.winner === false && final && "opacity-60"
          )}
        >
          <span className="text-xs leading-3">{teamData.location}</span>
          <span className="text-lg leading-6 font-medium">
            {teamData.name}
            <span className="text-sm text-gray-500 ml-1">
              ({teamData.record})
            </span>
          </span>
        </div>
      </Link>
      {odds !== undefined ? (
        <div className="flex flex-1 justify-end">
          <div className="w-[150px] flex gap-2 items-center">
            <span className="font-medium text-xs text-gray-500">
              {oddsType}:
            </span>
            <span className="text-sm font-semibold">{odds}</span>
          </div>
        </div>
      ) : (
        <Linescores
          periods={teamData.linescores}
          total={teamData.score}
          losingTeam={!teamData.winner}
          final={final}
        />
      )}
    </div>
  );
}
