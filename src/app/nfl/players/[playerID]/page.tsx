import { getNflPlayerPageData } from "@/lib/nflAPI";
import React, { Suspense } from "react";
import PlayerProfile from "./_components/PlayerProfile";

interface Props {
  params: { playerID: string };
}

export default async function page({ params }: Props) {
  const playerID = params.playerID;
  const data = await getNflPlayerPageData(playerID);

  return (
    <Suspense fallback={<PlayerProfile.Skeleton />}>
      <PlayerProfile data={data} />
    </Suspense>
  );
}
