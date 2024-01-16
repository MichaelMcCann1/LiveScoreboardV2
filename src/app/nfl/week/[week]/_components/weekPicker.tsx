"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getNflWeeks } from "@/lib/utils/NFL/getNflWeeks";

interface Props {
  currentWeek: string;
}

export default function WeekPicker({ currentWeek }: Props) {
  const [value, setValue] = useState(currentWeek);
  const router = useRouter();
  const weeks = getNflWeeks();
  const selectedWeek = weeks.find((week) => String(week.week) === value);

  if (!selectedWeek) {
    return null;
  }

  return (
    <Select
      value={value}
      onValueChange={(week) => {
        setValue(week);
        router.push(`/nfl/week/${week}`);
      }}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue aria-label={value}>{selectedWeek.text}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {weeks.map((week) => (
            <SelectItem key={week.week} value={String(week.week)}>
              {week.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
