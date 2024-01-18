import PlayerHeadshot from "@/components/PlayerHeadshot/PlayerHeadshot";
import { LeaderData } from "@/types";
import Link from "next/link";
import React from "react";

interface Props {
  leader: LeaderData;
  sport: string;
}

export default function Leader({ leader, sport }: Props) {
  return (
    <Link
      href={`/${sport}/players/${leader.id}`}
      className="flex gap-2 items-center text-xs text-gray-500 w-[250px]"
    >
      <span className="w-[50px]">{leader.shortDisplayName}</span>
      <PlayerHeadshot src={leader.headshot} size={36} name={leader.shortName} />
      <div className="flex flex-col whitespace-nowrap">
        <div className="flex gap-1">
          <span className="font-semibold text-gray-800">
            {leader.shortName}
          </span>
          <span>{leader.position}</span>
        </div>
        <span>{leader.displayValue}</span>
      </div>
    </Link>
  );
}
