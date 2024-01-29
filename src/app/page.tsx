import { Button } from "@/components/ui/button";
import { NbaUrl, NcaafUrl, NflUrl } from "@/constants";
import Link from "next/link";

const linkData = [
  { text: "NFL", href: `/${NflUrl}` },
  { text: "NCAAF", href: `/${NcaafUrl}` },
  { text: "NBA", href: `/${NbaUrl}` },
];

export default function Home() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-4 px-2">
      <h1 className="text-4xl sm:text-6xl">Live Scoreboard</h1>
      <h3 className="sm:text-2xl">Check the scores of your favorite leagues</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 my-12">
        {linkData.map((league) => (
          <Button
            asChild
            variant="outline"
            className="w-[140px] sm:w-auto text-xl px-8 py-4 h-auto border-gray-500"
          >
            <Link href={league.href}>{league.text}</Link>
          </Button>
        ))}
      </div>
      <p className="max-w-[600px] px-3 text-sm">
        This app was made with the NextJS 14 React framework using TypeScript.
        Styles were created by using Tailwind. Basic UI elements were added from
        the{" "}
        <Link
          className="underline hover:text-sky-700"
          href={"https://ui.shadcn.com/"}
        >
          shadcn/ui
        </Link>{" "}
        component library. All data is provided by the{" "}
        <Link
          className="underline hover:text-sky-700"
          href="https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b"
        >
          {" "}
          ESPN web api.
        </Link>
      </p>
      <span className="absolute bottom-10 text-sm">
        Developed by{" "}
        <Link
          className="underline text-sky-700"
          href="https://michaelrmccann.com/"
        >
          Michael McCann
        </Link>
      </span>
    </div>
  );
}
