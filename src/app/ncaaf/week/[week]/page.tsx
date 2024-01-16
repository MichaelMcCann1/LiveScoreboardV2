import FootballHeader from "@/components/FootballHeader/FootballHeader";
import React from "react";
import NcaafScoreboard from "./_components/NcaafScoreboard";

interface Props {
  params: { week: string };
}

export default async function page({ params }: Props) {
  const week = params.week;

  return (
    <FootballHeader week={week} sport="NCAAF">
      <NcaafScoreboard week={week} />
    </FootballHeader>
  );
}
