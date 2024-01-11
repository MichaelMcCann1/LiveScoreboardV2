"use client";

import Divider from "@/components/Divider";
import PlayerHeadshot from "@/components/PlayerHeadshot";
import { Categories, NflTeamLeaderData } from "@/lib/types";
import classNames from "classnames";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const categories = ["Offense", "Defense"] as Categories[];

interface Props {
  data: NflTeamLeaderData[];
}

export default function TeamLeadersContent({ data }: Props) {
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
            className={classNames(
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
      <Divider />
      {leadersData?.map((leader, index) => (
        <Fragment key={leader.displayName}>
          <Link
            href={`/nfl/players/${leader.athlete.id}`}
            className="flex flex-col py-3 px-1 gap-1"
          >
            <span className="text-sm">{leader.displayName}</span>
            <div className="flex gap-4">
              <PlayerHeadshot src={leader.athlete.headshot} size={64} />
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
          {index !== leadersData.length - 1 && <Divider />}
        </Fragment>
      ))}
    </>
  );
}
