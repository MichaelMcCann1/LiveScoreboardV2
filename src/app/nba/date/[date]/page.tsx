import React from "react";
import NbaScoreboard from "./_components/NbaScoreboard";

interface Props {
  params: { date: string };
}

export default function page({ params }: Props) {
  const date = params.date;

  return <NbaScoreboard date={date} />;
}
