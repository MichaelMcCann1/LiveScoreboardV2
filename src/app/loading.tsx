import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className="h-full flex justify-center">
      <Skeleton className="w-[500px] h-10 bg-gray-200 mt-20" />
    </div>
  );
}
