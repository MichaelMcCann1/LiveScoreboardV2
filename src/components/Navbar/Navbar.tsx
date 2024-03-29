"use client";

import { NbaUrl, NcaafUrl, NflUrl } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const isActivePathname = (pathname: string, link: string) => {
  if (pathname === "/" && link === "/") return true;
  if (link === "/") return false;
  return pathname.includes(link);
};

const linkData = [
  { text: "Home", href: "/" },
  { text: "NFL", href: `/${NflUrl}` },
  { text: "NCAAF", href: `/${NcaafUrl}` },
  { text: "NBA", href: `/${NbaUrl}` },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex h-[60px] bg-gray-200 shadow-lg sticky top-0 w-full z-10 items-center justify-end sm:justify-center">
      <nav className="hidden sm:flex gap-16 items-center">
        {linkData.map((link) => (
          <Link
            key={link.text}
            className={cn(
              "text-xl font-medium ease-linear duration-200 hover:text-blue-600",
              {
                underline: isActivePathname(pathname, link.href),
              }
            )}
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
        <Link
          href={"https://github.com/MichaelMcCann1/LiveScoreboardV2"}
          className="absolute right-8 opacity-40 hover:opacity-100 transition-all duration-300"
          target="_blank"
        >
          <Image src={"/github.svg"} width={30} height={30} alt="Git-hub" />
        </Link>
      </nav>
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="ml-auto hover:bg-inherit">
              <Menu size={36} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-3">
              {linkData.map((link) => (
                <SheetClose asChild key={link.text}>
                  <Link
                    className={cn("text-xl font-medium", {
                      underline: isActivePathname(pathname, link.href),
                    })}
                    href={link.href}
                  >
                    {link.text}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  href={"https://github.com/MichaelMcCann1/LiveScoreboardV2"}
                  className="text-xl"
                  target="_blank"
                >
                  GitHub
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
