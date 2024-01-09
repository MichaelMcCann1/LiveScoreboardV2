"use client";

import Divider from "@/components/Divider";
import ErrorState from "@/components/ErrorState";
import LoadingSpinner from "@/components/LoadingSpinner";
import ScoreBox from "@/components/ScoreBox/ScoreBox";
import { useNflScoreboard } from "@/data/queries";
import { groupBy } from "lodash";
import { DateTime } from "luxon";
import React, { Fragment } from "react";

export default function page() {
  const { data, isError, isLoading, isSuccess } = useNflScoreboard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !isSuccess) {
    return <ErrorState />;
  }

  const groupedData = groupBy(
    data,
    (e) => DateTime.fromISO(e.date).weekdayShort
  );

  return (
    <div className="flex flex-col gap-4 items-center">
      {Object.values(groupedData).map((gameGroup) => {
        const gameGroupDateTime = DateTime.fromISO(gameGroup[0].date);

        return (
          <div
            key={gameGroupDateTime.weekdayShort}
            className="w-full max-w-[800px] px-4 bg-white shadow-xl rounded-lg flex flex-col"
          >
            <span className="py-3 font-semibold">
              {gameGroupDateTime.toFormat("ccc, LLL d")}
            </span>
            <Divider />
            {gameGroup.map((game, index) => (
              <Fragment key={game.id}>
                <ScoreBox gameData={game} />
                {index !== gameGroup.length - 1 && <Divider />}
              </Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}
