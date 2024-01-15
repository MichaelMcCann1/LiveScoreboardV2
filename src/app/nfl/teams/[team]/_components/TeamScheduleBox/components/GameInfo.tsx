import { DateTime } from "luxon";
import React from "react";

interface Props {
  date: string;
  tv: string;
}

export default function GameInfo({ date, tv }: Props) {
  const gameDateTime = DateTime.fromISO(date);

  return (
    <div className="ml-auto flex flex-col text-xs leading-3 items-end">
      <span>{gameDateTime.toFormat("L/d")}</span>
      <span>{gameDateTime.toFormat("t")}</span>
      <span>{tv}</span>
    </div>
  );
}
