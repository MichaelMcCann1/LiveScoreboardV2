import { getNflWeek } from "@/api/nflAPI";
import { NflUrl } from "@/constants";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const data = await getNflWeek();

  if (data) {
    redirect(`/${NflUrl}/week/${data}`);
  }

  return <div>Loading</div>;
}
