import { TeamBannerData } from "@/types";

export const formatTeamBannerData = (data: any) => {
  const teamData = data.team;

  return {
    location: teamData?.location,
    nickname: teamData?.name,
    standingSummary: teamData?.standingSummary,
    logo: teamData?.logos?.[0]?.href,
    record: teamData?.record?.items?.[0]?.summary,
  } as TeamBannerData;
};
