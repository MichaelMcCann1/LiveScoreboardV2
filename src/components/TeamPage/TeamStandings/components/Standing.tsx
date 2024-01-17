import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  data: string[];
  abbreviation?: string;
  header?: boolean;
  bold?: boolean;
  sportUrl?: string;
}

export default function Standing({
  data,
  abbreviation,
  header,
  bold,
  sportUrl,
}: Props) {
  return (
    <div className="flex items-center font-light py-1 text-sm">
      {header ? (
        <span className="uppercase font-bold">{data?.[0]}</span>
      ) : (
        <Link
          className={cn(
            "hover:underline hover:font-medium",
            bold && "font-medium"
          )}
          href={`/${sportUrl}/teams/${abbreviation}`}
        >
          {data[0]}
        </Link>
      )}
      <div className="ml-auto flex items-center">
        {data?.slice(1).map((item, index) => (
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
