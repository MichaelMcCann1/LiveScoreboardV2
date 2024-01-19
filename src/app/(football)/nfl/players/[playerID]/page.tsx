import { getNflPlayerPageData } from "@/api/nflAPI";
import React, { Suspense } from "react";
import PlayerProfile from "../../../../../components/PlayerProfile/PlayerProfile";
import { NflUrl } from "@/constants";

interface Props {
  params: { playerID: string };
}

export default async function page({ params }: Props) {
  const playerID = params.playerID;
  const data = await getNflPlayerPageData(playerID);

  return (
    <Suspense fallback={<PlayerProfile.Skeleton />}>
      <PlayerProfile data={data} sport={NflUrl} />
    </Suspense>
  );
}
