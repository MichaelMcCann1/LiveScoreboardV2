import { getNcaafWeek } from "@/api/ncaafAPI";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const data = await getNcaafWeek();

  if (data) {
    redirect(`/ncaaf/week/${data}`);
  }

  return <div>Loading</div>;
}
