import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  periods: number[];
  total?: string;
  losingTeam?: boolean;
}

export default function Linescores({ periods, total, losingTeam }: Props) {
  return (
    <div
      className={cn(
        "flex gap-2 ml-auto items-center text-sm",
        total === undefined && "font-semibold",
        losingTeam && "opacity-60"
      )}
    >
      {periods?.map((period, index) => (
        <span className="w-5 text-center" key={`${period} ${index}`}>
          {period}
        </span>
      ))}
      <span
        className={cn(
          "w-[50px] text-right",
          total !== undefined && "text-xl font-semibold"
        )}
      >
        {periods === undefined ? "" : total ?? "T"}
      </span>
    </div>
  );
}
