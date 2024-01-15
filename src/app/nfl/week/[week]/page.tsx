import classNames from "classnames";
import Link from "next/link";
import React, { Suspense } from "react";
import ScoreboardContent from "./_components/ScoreboardContent";
import { times } from "lodash";

const getButtonText = (currentWeek: number) => {
  const regularSeasonWeeks = times(18).map((week) => {
    return {
      week: week + 1,
      text: `Week ${week + 1}`,
    };
  });
  const playoffWeeks = [
    { week: 19, text: "Wild Card" },
    { week: 20, text: "Divisonal" },
    { week: 21, text: "Conf Champ" },
    { week: 22, text: "Pro Bowl" },
    { week: 23, text: "Super Bowl" },
  ];
  const weeks = [...regularSeasonWeeks, ...playoffWeeks];
  if (currentWeek === 1) return weeks.slice(0, 3);
  if (currentWeek === weeks.length) return weeks.slice(weeks.length - 3);
  return weeks.slice(currentWeek - 2, currentWeek + 1);
};

interface Props {
  params: { week: string };
}

export default async function page({ params }: Props) {
  const currentWeek = params.week;

  return (
    <div className="flex flex-col gap-4 items-center pb-10">
      <h1 className="text-5xl mt-20 mb-10">NFL Scoreboard</h1>
      <div className="flex gap-8 mb-10">
        {getButtonText(Number(currentWeek)).map((data) => (
          <Link
            key={data.week}
            className={classNames(
              "border border-gray-600 px-3 py-2 rounded-xl bg-white",
              Number(currentWeek) === data.week ? "border-blue-600" : ""
            )}
            href={`/nfl/week/${data.week}`}
          >
            {data.text}
          </Link>
        ))}
      </div>
      <Suspense fallback={<ScoreboardContent.Skeleton />}>
        <ScoreboardContent week={currentWeek} />
      </Suspense>
    </div>
  );
}
