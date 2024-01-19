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
import { WeeksList } from "@/types";

interface Props {
  currentWeek: string;
  weeksList: WeeksList;
  sportRoute: string;
}

export default function WeekPicker({
  currentWeek,
  weeksList,
  sportRoute,
}: Props) {
  const [value, setValue] = useState(currentWeek);
  const router = useRouter();
  const selectedWeek = weeksList.find((week) => String(week.week) === value);

  if (!selectedWeek) {
    return null;
  }

  return (
    <Select
      value={value}
      onValueChange={(week) => {
        setValue(week);
        router.push(`/${sportRoute}/week/${week}`);
      }}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue aria-label={value}>{selectedWeek.text}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {weeksList.map((week) => (
            <SelectItem key={week.week} value={String(week.week)}>
              {week.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
