import React from "react";

interface Props {
  src: string;
  size: number;
}

export default function PlayerHeadshot({ src, size }: Props) {
  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      className={
        "border border-gray-300 rounded-full flex items-center justify-center overflow-hidden"
      }
    >
      <img className="h-full w-auto max-w-none" src={src} />
    </div>
  );
}
