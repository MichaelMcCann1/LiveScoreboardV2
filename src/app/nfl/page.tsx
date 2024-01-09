"use client";

import ErrorState from "@/components/ErrorState";
import LoadingSpinner from "@/components/LoadingSpinner";
import ScoreBox from "@/components/ScoreBox/ScoreBox";
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
    <div className="flex flex-col gap-8 items-center">
      {data.map((game) => (
        <ScoreBox key={game.id} gameData={game} />
      ))}
    </div>
  );
}
