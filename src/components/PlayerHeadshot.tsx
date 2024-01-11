import React from "react";

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
        "border border-gray-300 rounded-full flex items-center justify-center overflow-hidden"
      }
    >
      <img className="h-full w-auto max-w-none" src={src} alt={name} />
    </div>
  );
}
