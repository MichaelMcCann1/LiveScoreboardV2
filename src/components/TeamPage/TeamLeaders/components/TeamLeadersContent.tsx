"use client";

import PlayerHeadshot from "@/components/PlayerHeadshot/PlayerHeadshot";
import { Separator } from "@/components/ui/separator";
import { Categories, TeamLeaderData } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const categories = ["Offense", "Defense"] as Categories[];

interface Props {
  data: TeamLeaderData[];
  sportUrl: string;
}

export default function TeamLeadersContent({ data, sportUrl }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<Categories>("Offense");

  const leadersData = data?.filter(
    (leader) => leader.category === selectedCategory
  );
  return (
    <>
      <div className="flex">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "w-1/2	p-3 hover:opacity-100 hover:font-semibold",
              category === selectedCategory
                ? "font-semibold border-b-2 border-red-500"
                : "opacity-60"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <Separator />
      {leadersData?.map((leader, index) => (
        <Fragment key={leader.displayName}>
          <Link
            href={`/${sportUrl}/players/${leader.athlete.id}`}
            className="flex flex-col py-3 px-1 gap-1"
          >
            <span className="text-sm">{leader.displayName}</span>
            <div className="flex gap-4">
              <PlayerHeadshot
                src={leader.athlete.headshot}
                size={64}
                name={leader.athlete.fullName}
              />
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-medium pr-1">
                    {leader.athlete.fullName}
                  </span>
                  <span className="text-xs font-light">
                    {leader.athlete.position} #{leader.athlete.jersey}
                  </span>
                </div>
                <span className="text-2xl">
                  {Number(leader.value).toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
          {index !== leadersData.length - 1 && <Separator />}
        </Fragment>
      ))}
    </>
  );
}
