import { getNflTeamLeaderData } from "@/lib/nflAPI";
import TeamLeadersContent from "./TeamLeadersContent";

interface Props {
  team: string;
}

export default async function TeamLeaders({ team }: Props) {
  const data = await getNflTeamLeaderData(team);

  return (
    <div className="flex flex-col bg-white rounded-xl w-[400px] px-2 pb-4">
      <span className="py-4 px-2 font-semibold text-lg">Team Leaders</span>
      <TeamLeadersContent data={data} />
    </div>
  );
}
