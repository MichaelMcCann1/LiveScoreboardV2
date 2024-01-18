import { getNbaDay } from "@/api/nbaAPI";
import { NbaUrl } from "@/constants";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const data = await getNbaDay();

  if (data) {
    redirect(`/${NbaUrl}/date/${data}`);
  }

  return <div>Loading</div>;
}
