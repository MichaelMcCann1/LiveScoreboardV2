"use client";

import Divider from "@/components/Divider";
import { useNflStandings } from "@/data/queries";
import React from "react";
import Standing from "./Standing";

interface Props {
  team: string;
}

export default function TeamStandings({ team }: Props) {
  const { data, isSuccess } = useNflStandings();

  if (isSuccess) {
    console.log(data);
    const division = data.find((division) =>
      division.standings.some((t) => t.abbreviation === team)
    );

    console.log(division);
    return (
      <div className="flex flex-col bg-white rounded-xl w-[300px] px-2">
        <span className="py-4 px-2 font-semibold text-lg">{division?.name} Standings</span>
        <Divider />
        <Standing
          team={"Team"}
          wins={"W"}
          losses={"L"}
          ties={"T"}
          pct={"PCT"}
          header
        />
        <Divider />
        {division?.standings.map((t) => (
          <Standing
            key={t.abbreviation}
            team={t.location}
            wins={t.wins}
            losses={t.losses}
            ties={t.ties}
            pct={t.pct}
            abbreviation={t.abbreviation}
            bold={t.abbreviation === team}
          />
        ))}
      </div>
    );
  }
}