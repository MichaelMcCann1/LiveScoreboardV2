import classNames from "classnames";
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
          className={classNames(
            "hover:underline hover:font-medium",
            bold && "font-medium"
          )}
          href={`/nfl/teams/${abbreviation}`}
        >
          {team}
        </Link>
      )}
      <span
        className={classNames(
          "px-2 ml-auto",
          header && "font-bold",
          bold && "font-medium"
        )}
      >
        {wins}
      </span>
      {[losses, ties, pct].map((item) => (
        <span
          key={item}
          className={classNames(
            "px-2",
            header && "font-bold",
            bold && "font-medium"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
