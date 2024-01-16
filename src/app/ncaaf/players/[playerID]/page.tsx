import PlayerProfile from "@/components/PlayerProfile/PlayerProfile";
import { getNcaafPlayerPageData } from "@/lib/ncaafAPI";
import React, { Suspense } from "react";

interface Props {
  params: { playerID: string };
}

export default async function page({ params }: Props) {
  const playerID = params.playerID;
  const data = await getNcaafPlayerPageData(playerID);

  return (
    <Suspense fallback={<PlayerProfile.Skeleton />}>
      <PlayerProfile data={data} sport="ncaaf"/>
    </Suspense>
  );
}
