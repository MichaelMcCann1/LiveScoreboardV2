import { getNflScoreboardData } from "@/lib/nflAPI";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import ScoreboardContent from "./components/ScoreboardContent";

const getButtonText = (currentWeek: number) => {
  const regularSeasonWeeks = Array.from({ length: 18 }, (_, i) => {
    return {
      week: i + 1,
      text: `Week ${i + 1}`,
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
  const data = await getNflScoreboardData(currentWeek);

  return (
    <div className="flex flex-col gap-4 items-center pb-10">
      <h1 className="text-5xl mt-20 mb-10">NFL Scoreboard</h1>
      <div className="flex gap-8 mb-10">
        {getButtonText(Number(currentWeek)).map((data) => (
          <Link
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
      <ScoreboardContent data={data} />
    </div>
  );
}
