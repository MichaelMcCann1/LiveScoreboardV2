import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WeeksList } from "@/types";

const getButtonText = (currentWeek: number, weeksList: WeeksList) => {
  if (currentWeek === 22) return []; //pro bowl
  if (currentWeek === 1) return weeksList.slice(0, 3);
  if (currentWeek === weeksList.length + 1)
    return weeksList.slice(weeksList.length - 3);
  return weeksList.slice(currentWeek - 2, currentWeek + 1);
};

interface Props {
  currentWeek: string;
  weeksList: WeeksList;
  sportRoute: string;
}

export default function WeekButtons({
  currentWeek,
  weeksList,
  sportRoute,
}: Props) {
  return (
    <div className="flex gap-2">
      {getButtonText(Number(currentWeek), weeksList).map((data) => (
        <Button
          key={data.week}
          asChild
          variant={data.week === Number(currentWeek) ? "selected" : "outline"}
        >
          <Link key={data.week} href={`/${sportRoute}/week/${data.week}`}>
            {data.text}
          </Link>
        </Button>
      ))}
    </div>
  );
}
