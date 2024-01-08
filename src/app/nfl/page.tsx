"use client";

import ErrorState from "@/components/ErrorState";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useNflScoreboard } from "@/data/queries";
import React from "react";

export default function page() {
  const { data, isError, isLoading, isSuccess } = useNflScoreboard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !isSuccess) {
    return <ErrorState />;
  }

  console.log(data);

  return (
    <div>
      {data.map((game) => (
        <div key={game.id}>
          {game.homeTeamData.name} vs {game.awayTeamData.name}
        </div>
      ))}
    </div>
  );
}
