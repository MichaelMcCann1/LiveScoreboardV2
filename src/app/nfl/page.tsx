import { getNflWeek } from "@/api/nflAPI";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const data = await getNflWeek();

  if (data) {
    redirect(`/nfl/week/${data}`);
  }

  return <div>Loading</div>;
}
