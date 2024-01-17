import { Skeleton } from "@/components/ui/skeleton";
import { PlayerData } from "@/lib/types";
import { times } from "lodash";
import Link from "next/link";
import React from "react";

interface Props {
  data: PlayerData;
  sport: string;
}

export default function PlayerProfile({ data, sport }: Props) {
  const stats = [
    { label: "Height", value: data?.height },
    { label: "Weight", value: data?.weight },
    { label: "Age", value: data?.age },
    { label: "Draft", value: data?.draft },
    { label: "Home Town", value: `${data?.city}, ${data?.state}` },
  ].filter((stat) => stat.value);

  return (
    <div className="flex flex-col gap-10 items-center pt-20">
      <div className="flex gap-6 items-center">
        <div className="h-[220px] relative">
          <div className="h-full overflow-hidden absolute left-1/2 -translate-x-1/2">
            <img
              className="h-[250px] max-w-none opacity-30"
              src={data?.logo}
              alt={`${data.location} logo`}
            />
          </div>
          <img
            className="h-full max-w-none relative z-10"
            src={data?.headshot}
            alt={`${data?.firstName} ${data?.lastName}`}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-5xl font-light">{data?.firstName}</span>
          <span className="text-6xl font-medium">{data?.lastName}</span>
          <div className="mt-2">
            <span className="font-light">
              <Link href={`/${sport}/teams/${data?.id}`}>
                {data?.location} {data?.nickname}
              </Link>{" "}
              - {data?.position} - #{data?.jersey}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex gap-2">
            <span className="font-light">{stat.label}:</span>
            <span className="font-medium">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

PlayerProfile.Skeleton = function PlayerProfileSkeleton() {
  return (
    <div className="flex flex-col gap-10 items-center pt-20">
      <div className="flex gap-6 items-center">
        <Skeleton className="w-[300px] h-[220px] bg-gray-200" />
        <div className="flex flex-col gap-3">
          <Skeleton className="w-40 h-10 bg-gray-200" />
          <Skeleton className="w-40 h-14 bg-gray-200" />
          <Skeleton className="w-80 h-5 bg-gray-200" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-6">
        {times(6).map((stat) => (
          <Skeleton key={stat} className="w-80 h-6 bg-gray-200" />
        ))}
      </div>
    </div>
  );
};
