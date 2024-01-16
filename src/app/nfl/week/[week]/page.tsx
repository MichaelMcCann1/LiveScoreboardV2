import React from "react";
import FootballHeader from "@/components/FootballHeader/FootballHeader";
import NflScoreboard from "./_components/NflScoreboard";
import { getNflWeeks } from "@/lib/utils/NFL/getNflWeeks";

interface Props {
  params: { week: string };
}

export default async function page({ params }: Props) {
  const week = params.week;

  return (
    <FootballHeader
      week={week}
      sport="NFL"
      weeksList={getNflWeeks()}
      sportRoute="nfl"
    >
      <NflScoreboard week={week} />
    </FootballHeader>
  );
}
