import { getNcaafWeek } from "@/api/ncaafAPI";
import { NcaafUrl } from "@/constants";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const data = await getNcaafWeek();

  if (data) {
    redirect(`/${NcaafUrl}/week/${data}`);
  }

  return <div>Loading</div>;
}
