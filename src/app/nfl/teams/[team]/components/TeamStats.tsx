import Divider from "@/components/Divider";
import { getNflTeamStats } from "@/lib/nflAPI";
import React from "react";

interface Props {
  team: string;
}

export default async function TeamStats({ team }: Props) {
  const data = await getNflTeamStats(team)

  return (
    <div className="flex flex-col bg-white rounded-xl w-[400px] px-2 pb-4">
      <span className="py-4 px-2 font-semibold text-lg">Team Stats</span>
      <Divider />
      <div className="grid grid-cols-2 gap-4 pt-2">
        {data?.map((stat) => (
          <div key={stat.stat} className="flex flex-col items-center border">
            <span className="text-sm text-gray-500 font-extralight">
              {stat.stat}
            </span>
            <span className="text-2xl font-semibold my-1">{stat.value}</span>
            <span className="text-gray-500 font-light">{stat.rank}th</span>
          </div>
        ))}
      </div>
    </div>
  );
}
