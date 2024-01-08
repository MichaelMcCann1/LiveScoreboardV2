import { TeamData } from "@/data/queries";
import React from "react";
import Linescores from "./Linescores";
import classNames from "classnames";

interface Props {
  teamData: TeamData;
}

export default function TeamBox({ teamData }: Props) {
  return (
    <div className={"flex h-14 items-center gap-2"}>
      <img
        className="h-[80%]"
        src={teamData.logo}
        alt={`${teamData.name} logo`}
      />
      <div
        className={classNames(
          "flex flex-col",
          !teamData.winner && "opacity-60"
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
      <Linescores
        periods={teamData.linescores}
        total={teamData.score}
        losingTeam={!teamData.winner}
      />
    </div>
  );
}
