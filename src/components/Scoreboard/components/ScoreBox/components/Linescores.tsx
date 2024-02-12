import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  periods: (number | string)[];
  total?: string;
  losingTeam?: boolean;
  final: boolean;
}

export default function Linescores({ periods, total, losingTeam, final }: Props) {
  return (
    <div
      className={cn(
        "gap-2 ml-auto items-center text-sm hidden min-[500px]:flex",
        total === undefined && "font-semibold",
        losingTeam && final && "opacity-60"
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
