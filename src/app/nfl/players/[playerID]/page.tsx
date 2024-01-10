"use client";

import { useNflPlayer } from "@/data/queries";
import React from "react";

interface Props {
  params: { playerID: string };
}

export default function page({ params }: Props) {
  const playerID = params.playerID;
  console.log(playerID);
  const { data } = useNflPlayer(playerID);

  console.log(data);

  return <div>Player Page</div>;
}
