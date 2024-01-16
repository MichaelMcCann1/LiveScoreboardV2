import { Skeleton } from "@/components/ui/skeleton";
import { getNflTeamBannerData } from "@/lib/nflAPI";
import React from "react";

interface Props {
  team: string;
}

export default async function TeamBanner({ team }: Props) {
  const data = await getNflTeamBannerData(team);

  return (
    <div className="flex gap-6 items-center justify-center py-10">
      <img
        src={data?.logo}
        className="h-[160px]"
        alt={`${data.location} logo`}
      />
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

TeamBanner.Skeleton = function TeamBannerSkeleton() {
  return (
    <div className="flex gap-6 items-center justify-center py-10 ">
      <Skeleton className="w-[160px] h-[160px] bg-gray-200" />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[250px] h-9 bg-gray-200" />
        <Skeleton className="w-[150px] h-5 bg-gray-200" />
      </div>
    </div>
  );
};
