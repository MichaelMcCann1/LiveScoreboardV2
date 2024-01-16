import FootballHeader from "@/components/FootballHeader/FootballHeader";
import React from "react";
import NcaafScoreboard from "./_components/NcaafScoreboard";
import { getNcaaWeeks } from "@/lib/utils/NCAAF/getNcaafWeeks";
import { NcaafUrl } from "@/lib/constants";

interface Props {
  params: { week: string };
}

export default async function page({ params }: Props) {
  const week = params.week;

  return (
    <FootballHeader
      week={week}
      sport="NCAAF"
      weeksList={getNcaaWeeks()}
      sportRoute={NcaafUrl}
    >
      <NcaafScoreboard week={week} />
    </FootballHeader>
  );
}
