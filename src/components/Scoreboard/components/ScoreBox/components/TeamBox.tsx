import React from "react";
import Linescores from "./Linescores";
import Link from "next/link";
import { TeamData } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  teamData: TeamData;
  odds?: string;
  oddsType: string;
  sport: string;
  status: string;
}

export default function TeamBox({
  teamData,
  odds,
  oddsType,
  sport,
  status,
}: Props) {
  return (
    <div className={"flex h-14 py-2 items-center gap-2"}>
      <Link
        href={`/${sport}/teams/${teamData.id}`}
        className="h-full flex items-center gap-2"
      >
        <Image
          src={teamData.logo}
          alt={`${teamData.name} logo`}
          width={40}
          height={40}
        />
        <div
          className={cn(
            "flex flex-col",
            teamData.winner === false && status === "Final" && "opacity-60"
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
        <div className="hidden flex-1 justify-end min-[500px]:flex">
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
          final={status === "Final"}
        />
      )}
      {(status === "In Progress" || status === "Final") && (
        <span className="text-2xl font-medium ml-auto min-[500px]:hidden">
          {teamData.score}
        </span>
      )}
    </div>
  );
}
