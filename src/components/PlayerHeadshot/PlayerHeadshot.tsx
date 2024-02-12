import React from "react";
import { UserRound } from "lucide-react";
import Image from "next/image";

interface Props {
  src: string;
  size: number;
  name: string;
}

export default function PlayerHeadshot({ src, size, name }: Props) {
  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      className={
        "border border-gray-300 rounded-full flex items-center justify-center overflow-hidden relative"
      }
    >
      {src ? (
        <Image src={src} alt={name} fill className="max-w-none object-cover" sizes="100px" />
      ) : (
        <UserRound className="h-full w-auto" />
      )}
    </div>
  );
}
