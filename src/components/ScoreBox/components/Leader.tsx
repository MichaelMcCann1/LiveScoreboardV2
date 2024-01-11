import PlayerHeadshot from "@/components/PlayerHeadshot";
import { LeaderData } from "@/lib/types";
import Link from "next/link";
import React from "react";

interface Props {
  leader: LeaderData;
}

export default function Leader({ leader }: Props) {
  return (
    <Link
      href={`/nfl/players/${leader.id}`}
      className="flex gap-2 items-center text-xs text-gray-500 w-[250px]"
    >
      <span className="w-[50px]">{leader.shortDisplayName}</span>
      <PlayerHeadshot src={leader.headshot} size={36} />
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
