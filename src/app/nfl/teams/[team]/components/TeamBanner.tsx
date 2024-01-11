import { getNflTeamBannerData } from "@/lib/nflAPI";
import React from "react";

interface Props {
  team: string;
}

export default async function TeamBanner({ team }: Props) {
  const data = await getNflTeamBannerData(team);

  return (
    <div className="flex gap-6 items-center justify-center py-10">
      <img src={data?.logo} className="h-[160px]" />
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-medium">
          {data?.location} {data?.nickname}
        </span>
        <div>
          <span className="font-medium">({data?.record}) -</span>{" "}
          <span className="font-light">{data?.standingSummary}</span>
        </div>
      </div>
    </div>
  );
}
