import { Skeleton } from "@/components/ui/skeleton";
import { TeamBannerData } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  team: string;
  query: (team: string) => Promise<TeamBannerData>;
}

export default async function TeamBanner({ team, query }: Props) {
  const data = await query(team);

  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 items-center justify-center py-10">
      {!data?.location ? (
        <h3 className="text-2xl">No Team Found</h3>
      ) : (
        <>
          <Image
            src={data?.logo}
            alt={`${data.location} logo`}
            width={160}
            height={160}
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
        </>
      )}
    </div>
  );
}

TeamBanner.Skeleton = function TeamBannerSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center py-10 ">
      <Skeleton className="w-[160px] h-[160px] bg-gray-200" />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[250px] h-9 bg-gray-200" />
        <Skeleton className="w-[150px] h-5 bg-gray-200" />
      </div>
    </div>
  );
};
