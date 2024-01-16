import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getNflWeeks } from "@/lib/utils/NFL/getNflWeeks";

const getButtonText = (currentWeek: number) => {
  const weeks = getNflWeeks();
  if (currentWeek === 1) return weeks.slice(0, 3);
  if (currentWeek === weeks.length) return weeks.slice(weeks.length - 3);
  return weeks.slice(currentWeek - 2, currentWeek + 1);
};

interface Props {
  currentWeek: string;
}

export default function WeekButtons({ currentWeek }: Props) {
  return (
    <div className="flex gap-2">
      {getButtonText(Number(currentWeek)).map((data) => (
        <Button
          key={data.week}
          asChild
          variant={data.week === Number(currentWeek) ? "selected" : "outline"}
        >
          <Link key={data.week} href={`/nfl/week/${data.week}`}>
            {data.text}
          </Link>
        </Button>
      ))}
    </div>
  );
}
