import TeamLeadersContent from "./components/TeamLeadersContent";
import WidgetWrapper from "@/components/WidgetWrapper/WidgetWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { times } from "lodash";
import { TeamLeaderData } from "@/lib/types";

interface Props {
  team: string;
  query: (team: string) => Promise<TeamLeaderData[]>;
  sportUrl: string;
}

export default async function TeamLeaders({ team, query, sportUrl }: Props) {
  const data = await query(team);

  return (
    <WidgetWrapper title="Team Leaders" maxWidth={350}>
      <TeamLeadersContent data={data} sportUrl={sportUrl} />
    </WidgetWrapper>
  );
}

TeamLeaders.Skeleton = function TeamLeadersSkeleton() {
  return (
    <WidgetWrapper.Skeleton maxWidth={350}>
      <div className="flex flex-col py-4 gap-6">
        <Skeleton className="w-full h-10" />
        {times(3).map((leader) => (
          <div key={leader} className="flex gap-4">
            <Skeleton className="w-16 h-16" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[150px] h-4" />
              <Skeleton className="w-[75px] h-8" />
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper.Skeleton>
  );
};
