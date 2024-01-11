import { getNflTeamLeaderData } from "@/lib/nflAPI";
import TeamLeadersContent from "./TeamLeadersContent";
import WidgetWrapper from "@/components/WidgetWrapper";

interface Props {
  team: string;
}

export default async function TeamLeaders({ team }: Props) {
  const data = await getNflTeamLeaderData(team);

  return (
    <WidgetWrapper title="Team Leaders" maxWidth={350}>
      <TeamLeadersContent data={data} />
    </WidgetWrapper>
  );
}
