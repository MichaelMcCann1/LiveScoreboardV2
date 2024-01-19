import { getNbaPlayerPageData } from "@/api/nbaAPI";
import PlayerProfile from "@/components/PlayerProfile/PlayerProfile";
import { NbaUrl } from "@/constants";
import React, { Suspense } from "react";

interface Props {
  params: { playerID: string };
}

export default async function page({ params }: Props) {
  const playerID = params.playerID;
  const data = await getNbaPlayerPageData(playerID);

  return (
    <Suspense fallback={<PlayerProfile.Skeleton />}>
      <PlayerProfile data={data} sport={NbaUrl} />
    </Suspense>
  );
}
