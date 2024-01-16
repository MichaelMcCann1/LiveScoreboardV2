import { NflScoreboardData } from "@/lib/types";
import { groupBy, isEmpty, times } from "lodash";
import { DateTime } from "luxon";
import React, { Fragment } from "react";
import WidgetWrapper from "../WidgetWrapper";
import ScoreBox from "./components/ScoreBox/ScoreBox";
import Divider from "../Divider";
import { Skeleton } from "../ui/skeleton";

interface Props {
  data: NflScoreboardData[];
  sport: string;
}

export default function Scoreboard({ data, sport }: Props) {
  const groupedData = groupBy(data, (e) =>
    DateTime.fromISO(e.date).toLocaleString(DateTime.DATE_MED)
  );

  if (isEmpty(data)) {
    return <h3 className="text-2xl">No Games Scheduled</h3>;
  }

  return (
    <>
      {Object.values(groupedData).map((gameGroup) => {
        const gameGroupDateTime = DateTime.fromISO(gameGroup[0].date);

        return (
          <WidgetWrapper
            key={gameGroupDateTime.weekdayShort}
            title={gameGroupDateTime.toFormat("ccc, LLL d")}
            bottomPadding={false}
          >
            {gameGroup.map((game, index) => (
              <Fragment key={game.id}>
                <ScoreBox gameData={game} sport={sport} />
                {index !== gameGroup.length - 1 && <Divider />}
              </Fragment>
            ))}
          </WidgetWrapper>
        );
      })}
    </>
  );
}

Scoreboard.Skeleton = function SkeletonScoreboardContent() {
  return (
    <WidgetWrapper.Skeleton>
      {times(3).map((game) => (
        <div key={game} className="flex my-3 justify-between">
          <div className="flex flex-col w-[20%] gap-3 justify-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col w-[25%] gap-3 justify-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col w-[25%] gap-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      ))}
    </WidgetWrapper.Skeleton>
  );
};
