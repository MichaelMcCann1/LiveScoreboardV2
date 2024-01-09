import { LeaderData } from "@/data/queries";
import React from "react";

interface Props {
  leader: LeaderData;
}

export default function Leader({ leader }: Props) {
  return (
    <div className="flex gap-2 items-center text-xs text-gray-500">
      <span className="w-[50px]">{leader.shortDisplayName}</span>
      <div className="h-9 w-9 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
        <img
          className="w-[50px] max-w-none h-auto"
          src={leader.headshot}
          alt={leader.shortDisplayName}
        />
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <div className="flex gap-1">
          <span className="font-semibold">{leader.shortName}</span>
          <span>{leader.position}</span>
        </div>
        <span>{leader.displayValue}</span>
      </div>
    </div>
  );
}
