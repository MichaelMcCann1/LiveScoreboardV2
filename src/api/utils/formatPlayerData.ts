import { NflPlayerData } from "@/lib/types";

export const formatPlayerData = (playerData: any, teamData: any) => {
  return {
    firstName: playerData.firstName,
    lastName: playerData.lastName,
    jersey: playerData.jersey,
    position: playerData.position.displayName,
    height: playerData.displayHeight,
    weight: playerData.displayWeight,
    draft: playerData?.draft?.displayText,
    headshot: playerData.headshot.href,
    teamLink: playerData.team.$ref,
    age: playerData.age,
    city: playerData.birthPlace.city,
    state: playerData.birthPlace.state,
    location: teamData.location,
    nickname: teamData.name,
    logo: teamData.logos[0].href,
    abbreviation: teamData.id,
  } as NflPlayerData;
};
