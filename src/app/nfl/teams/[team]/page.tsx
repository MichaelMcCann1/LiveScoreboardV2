"use client";

import { useNflTeamBanner } from "@/data/queries";
import React from "react";
import TeamBanner from "./components/TeamBanner";

interface Props {
  params: { team: string };
}

export default function page({ params }: Props) {
  const team = params.team;
  const query = useNflTeamBanner(team);

  console.log(query.data);

  return (
    <div>
      <TeamBanner team={team} />
    </div>
  );
}
