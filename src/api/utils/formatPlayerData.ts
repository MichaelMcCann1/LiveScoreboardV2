import { PlayerData } from "@/types";

export const formatPlayerData = async (playerData: any) => {
  if (!playerData?.team?.$ref) {
    return undefined;
  }

  const teamDataResponse = await fetch(playerData?.team?.$ref);
  const teamData = await teamDataResponse.json();

  return {
    firstName: playerData?.firstName,
    lastName: playerData?.lastName,
    jersey: playerData?.jersey,
    position: playerData?.position?.displayName,
    height: playerData?.displayHeight,
    weight: playerData?.displayWeight,
    draft: playerData?.draft?.displayText,
    headshot: playerData?.headshot?.href,
    teamLink: playerData?.team?.$ref,
    age: playerData?.age,
    city: playerData?.birthPlace?.city,
    state: playerData?.birthPlace?.state,
    location: teamData?.location,
    nickname: teamData?.name,
    logo: teamData?.logos?.[0]?.href,
    id: teamData?.id,
  } as PlayerData;
};
