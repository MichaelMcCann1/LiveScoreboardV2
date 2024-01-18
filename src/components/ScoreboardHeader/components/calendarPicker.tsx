"use client";

import { Calendar } from "@/components/ui/calendar";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  date: string;
}

export default function CalendarPicker({ date }: Props) {
  const [selectedDay, setSelectedDay] = useState<Date>(
    DateTime.fromFormat(date, "yLLdd").toJSDate()
  );
  const router = useRouter();

  return (
    <Calendar
      className="bg-white text-xs"
      mode="single"
      selected={selectedDay}
      defaultMonth={selectedDay}
      onSelect={(selectedDate) => {
        if (!selectedDate) return;
        setSelectedDay(selectedDate);
        router.push(
          `/nba/date/${DateTime.fromJSDate(selectedDate).toFormat("yLLdd")}`
        );
      }}
    />
  );
}
