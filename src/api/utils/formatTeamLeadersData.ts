import {
  Categories,
  NflTeamLeaderAthleteData,
  NflTeamLeaderData,
} from "@/lib/types";

export const formatTeamLeadersData = async (
  offenseData: any[],
  defenseData: any[]
) => {
  const formattedOffsenseData = offenseData.map((data) =>
    formatData(data, "Offense")
  );
  const formattedDefenseData = defenseData.map((data) =>
    formatData(data, "Defense")
  );
  const orderedLeaders = [...formattedOffsenseData, ...formattedDefenseData];

  return (await Promise.all(
    orderedLeaders.map(async (leader) => {
      const athleteReponse = await fetch(leader.athlete);
      const athleteData = await athleteReponse.json();

      return {
        ...leader,
        athlete: {
          fullName: athleteData.fullName,
          headshot: athleteData.headshot.href,
          position: athleteData.position.abbreviation,
          jersey: athleteData.jersey,
          id: athleteData.id,
        } as NflTeamLeaderAthleteData,
      };
    })
  )) as NflTeamLeaderData[];
};

const formatData = (data: any, category: Categories) => {
  return {
    displayName: data.displayName,
    value: data.leaders[0].value,
    athlete: data.leaders[0].athlete.$ref,
    category,
  };
};
