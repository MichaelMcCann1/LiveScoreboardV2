import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  data: string[];
  id?: string;
  header?: boolean;
  bold?: boolean;
  sportUrl?: string;
  colWidth?: number;
}

export default function Standing({
  data,
  id,
  header,
  bold,
  sportUrl,
  colWidth = 30,
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
          href={`/${sportUrl}/teams/${id}`}
        >
          {data[0]}
        </Link>
      )}
      <div className="ml-auto flex items-center">
        {data?.slice(1).map((item, index) => (
          <span
            key={item}
            style={{ width: `${colWidth}px` }}
            className={cn(
              "text-center",
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
