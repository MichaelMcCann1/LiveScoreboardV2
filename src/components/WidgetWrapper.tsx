import React, { ReactNode } from "react";
import Divider from "./Divider";
import classNames from "classnames";

interface Props {
  title: string;
  children: ReactNode;
  maxWidth?: number;
  bottomPadding?: boolean;
}

export default function WidgetWrapper({
  title,
  children,
  maxWidth,
  bottomPadding = true,
}: Props) {
  return (
    <div
      className={classNames(
        "w-full max-w-[800px] px-4  bg-white shadow-xl rounded-lg flex flex-col",
        { "pb-4": bottomPadding }
      )}
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <span className="py-4 font-semibold text-lg">{title}</span>
      <Divider />
      {children}
    </div>
  );
}
