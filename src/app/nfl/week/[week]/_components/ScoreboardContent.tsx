import Divider from "@/components/Divider";
import ScoreBox from "@/components/ScoreBox/ScoreBox";
import WidgetWrapper from "@/components/WidgetWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { getNflScoreboardData } from "@/lib/nflAPI";
import { groupBy, isEmpty, times } from "lodash";
import { DateTime } from "luxon";
import React, { Fragment } from "react";

interface Props {
  week: string;
}

export default async function ScoreboardContent({ week }: Props) {
  const data = await getNflScoreboardData(week);

  const groupedData = groupBy(
    data,
    (e) => DateTime.fromISO(e.date).weekdayShort
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
                <ScoreBox gameData={game} />
                {index !== gameGroup.length - 1 && <Divider />}
              </Fragment>
            ))}
          </WidgetWrapper>
        );
      })}
    </>
  );
}

ScoreboardContent.Skeleton = function SkeletonScoreboardContent() {
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
