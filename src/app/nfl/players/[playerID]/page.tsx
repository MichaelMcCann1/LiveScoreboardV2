import { getNflPlayerPageData } from "@/lib/nflAPI";
import Link from "next/link";
import React from "react";

interface Props {
  params: { playerID: string };
}

export default async function page({ params }: Props) {
  const playerID = params.playerID;
  const data = await getNflPlayerPageData(playerID);

  const stats = [
    { label: "Height", value: data?.height },
    { label: "Weight", value: data?.weight },
    { label: "Age", value: data?.age },
    { label: "Draft", value: data?.draft },
    { label: "Home Town", value: `${data?.city}, ${data?.state}` },
  ];

  return (
    <div className="flex flex-col gap-10 items-center pt-20">
      <div className="flex gap-6 items-center">
        <div className="h-[220px] relative">
          <div className="h-full overflow-hidden absolute left-1/2 -translate-x-1/2">
            <img className="h-[250px] max-w-none opacity-30" src={data?.logo} />
          </div>
          <img
            className="h-full max-w-none relative z-10"
            src={data?.headshot}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-5xl font-light">{data?.firstName}</span>
          <span className="text-6xl font-medium">{data?.lastName}</span>
          <div className=" mt-2">
            <span className="font-light">
              <Link href={`/nfl/teams/${data?.abbreviation}`}>
                {data?.location} {data?.nickname}
              </Link>
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
