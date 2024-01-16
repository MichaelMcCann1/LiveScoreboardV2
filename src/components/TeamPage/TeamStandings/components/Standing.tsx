import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  team: string;
  wins: string;
  losses: string;
  ties: string;
  pct: string;
  abbreviation?: string;
  header?: boolean;
  bold?: boolean;
}

export default function Standing({
  team,
  wins,
  losses,
  ties,
  pct,
  abbreviation,
  header,
  bold,
}: Props) {
  return (
    <div className="flex items-center font-light py-1 text-sm">
      {header ? (
        <span className="uppercase font-bold">{team}</span>
      ) : (
        <Link
          className={cn(
            "hover:underline hover:font-medium",
            bold && "font-medium"
          )}
          href={`/nfl/teams/${abbreviation}`}
        >
          {team}
        </Link>
      )}
      <div className="ml-auto flex items-center">
        {[wins, losses, ties, pct].map((item, index) => (
          <span
            key={item}
            className={cn(
              "w-[30px] text-center",
              header && "font-bold",
              bold && "font-medium",
              index === 3 && "ml-1"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
